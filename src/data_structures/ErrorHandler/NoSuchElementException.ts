export class NoSuchElementException extends Error {

    // message: string;
    constructor(message: string = 'this element does not exist') {
        super()
        this.message = message;
    }
}