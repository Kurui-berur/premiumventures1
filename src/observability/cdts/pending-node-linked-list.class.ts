import { QueueADT } from "../contracts/adts/queue-adt.interface";
import { PendingNode } from "../contracts/nodes/pending-node.interface";

export class PendingNodeLinkedList implements QueueADT<PendingNode> {

    private head?:PendingNode;
    private tail?:PendingNode;
    private count=0;

    get size(): number {
        return this.count;
    }

    enqueue(item: PendingNode): void {

         const node:PendingNode=item;

    if (this.tail) {
      // Connect the new node after the current tail.
      node.previous = this.tail;
      this.tail.next = node;
    } else {
      // An empty queue has no head, so this is its first node.
      this.head = node;
    }

    // The new node is always the tail after enqueueing.
    this.tail = node;

    this.count++;

    }
    peek(): PendingNode | undefined {
        if(this.head){
            return this.head;
        } 
        return undefined;
    }

    dequeue(): PendingNode | undefined {
         const node = this.head;

    // Edge case: the queue is empty.
    if (!node) {
      return undefined;
    }

    const next = node.next;

    // Move the head to the next node.
    this.head = next;

    if (next) {
      // The new head no longer has a preceding node.
      next.previous = undefined;
    } else {
      // The removed node was the only node.
      // Therefore, the queue is now empty.
      this.tail = undefined;
    }

    // Detach the removed node from its former neighbors.
    node.previous = undefined;
    node.next = undefined;

    this.count--;

    return node;
  }
    
    
}