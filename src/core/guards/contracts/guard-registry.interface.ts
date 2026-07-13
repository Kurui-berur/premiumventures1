import type {
  Guard
}
from './guard.interface';

export interface GuardRegistry {

  resolve(

    guardId:
    string

  ): Promise<
    Guard
  >;

}