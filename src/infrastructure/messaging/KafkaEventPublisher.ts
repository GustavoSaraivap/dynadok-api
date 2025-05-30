import { IEventPublisher } from '../../domain/services/IEventPublisher';
import { Kafka, Producer } from 'kafkajs';

export class KafkaEventPublisher implements IEventPublisher {
  private producer: Producer;

  constructor(
    brokers = (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
  ) {
    const kafka = new Kafka({ clientId: 'clientes-api', brokers });
    this.producer = kafka.producer();
    this.producer.connect().catch(console.error);
  }

  async publish<T>(topic: string, payload: T): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }]
    });
  }
}
