import { Arraylist } from "../ArrayList/ArrayList";
import { NoSuchElementException } from "../ErrorHandler";

export class Stack<T> {
    private arr: Arraylist<T>;

    public push(element: T) {
        this.arr.addLast(element);
    }

    public pop(): T {
        return this.arr.removeLast();
    }

    public peek(): T {
        if (this.arr.isEmpty()) {
            throw new NoSuchElementException();
        }

        return this.arr.get(this.arr.size() - 1);
    }
}