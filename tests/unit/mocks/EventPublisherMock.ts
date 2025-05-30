import { IEventPublisher } from '../../../src/domain/services/IEventPublisher';

export class EventPublisherMock implements IEventPublisher {
  public published: { topic: string; payload: any }[] = [];

  async publish<T>(topic: string, payload: T): Promise<void> {
    this.published.push({ topic, payload });
  }
}
