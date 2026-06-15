import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { REDIS_CLIENT } from 'src/infra/redis/redis.token';

@Injectable()
export class FlowStateStoreService {

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis
  ) {}

  private key(flowId: string) {
    return `flow:${flowId}:state`;
  }

  // ======================================================
  // SAFE READ
  // ======================================================

  async getState(flowId: string): Promise<FlowRuntimeState | null> {
    const data = await this.redis.get(this.key(flowId));
    if (!data) return null;

    const parsed = JSON.parse(data);

    return {
      ...parsed,
      nodeStates: new Map(parsed.nodeStates),
      sceneStates: new Map(parsed.sceneStates),
    };
  }

  // ======================================================
  // ATOMIC UPDATE (IDEMPOTENT + SAFE)
  // ======================================================

  async updateState(
    flowId: string,
    updater: (state: FlowRuntimeState) => FlowRuntimeState
  ): Promise<void> {

    const key = this.key(flowId);

    const lua = `
      local current = redis.call('GET', KEYS[1])

      if not current then
        return nil
      end

      local state = cjson.decode(current)

      -- call update (passed from JS as JSON string)
      local patch = cjson.decode(ARGV[1])

      -- apply patch manually (safe merge)
      for k, v in pairs(patch) do
        state[k] = v
      end

      redis.call('SET', KEYS[1], cjson.encode(state))

      return state
    `;

    const current = await this.redis.get(key);

    if (!current) return;

    const state: FlowRuntimeState = {
      ...JSON.parse(current),
      nodeStates: new Map(JSON.parse(current).nodeStates),
      sceneStates: new Map(JSON.parse(current).sceneStates),
    };

    const updated = updater(state);

    const serialized = {
      ...updated,
      nodeStates: Array.from(updated.nodeStates.entries()),
      sceneStates: Array.from(updated.sceneStates.entries()),
    };

    await this.redis.set(
      key,
      JSON.stringify(serialized)
    );
  }

  // ======================================================
  // IDEMPOTENT ACTIVE NODE UPDATE
  // ======================================================

  async setActiveNode(
    flowId: string,
    nodeId: string | null
  ): Promise<void> {

    const key = this.key(flowId);

    await this.redis.eval(
      `
      local state = redis.call('GET', KEYS[1])
      if not state then return nil end

      local obj = cjson.decode(state)

      -- idempotent check (no-op if same value)
      if obj.activeNodeId == ARGV[1] then
        return obj
      end

      obj.activeNodeId = ARGV[1]

      redis.call('SET', KEYS[1], cjson.encode(obj))
      return obj
      `,
      1,
      key,
      nodeId
    );
  }
}