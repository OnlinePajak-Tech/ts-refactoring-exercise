export interface IMessagePublisher<T> {
    publish(message: IMessage<T>): void
}
export interface IMessage<T> {
    event_name: string,
    payload: T
}

export class MessagePublisher<T> implements IMessagePublisher<T> {
    publish(message: IMessage<T>): void {
        //NOT IMPLEMENTED
    }
}
