
/**
 * Defines the contract for a First In, First Out (FIFO) queue.
 *
 * The first item added is the first item removed.
 *
 * @typeParam T - Type of items stored in the queue.
 */
export interface QueueADT<T> {
  /**
   * Returns the number of items currently in the queue.
   */
  readonly size: number;

  /**
   * Adds an item to the back of the queue.
   *
   * @param item - The item to add.
   */
  enqueue(item: T): void;

  /**
   * Returns the oldest item without removing it.
   *
   * @returns The oldest item, or undefined if the queue is empty.
   */
  peek(): T | undefined;

  /**
   * Removes and returns the oldest item.
   *
   * @returns The removed item, or undefined if the queue is empty.
   */
  dequeue(): T | undefined;
}