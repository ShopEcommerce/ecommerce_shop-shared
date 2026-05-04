import { Channel, ConsumeMessage } from 'amqplib';
import { Event } from '../events/baseEvent';
import pino from 'pino';

const logger = pino();

export abstract class BaseListener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: ConsumeMessage): Promise<void>;
  protected channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async listen() {
    await this.channel.assertExchange(this.subject, 'fanout', { durable: true });
    const q = await this.channel.assertQueue(this.queueGroupName, { durable: true });
    await this.channel.bindQueue(q.queue, this.subject, '');
    await this.channel.prefetch(10);

    this.channel.consume(
      q.queue,
      async (msg) => {
        if (msg) {
          logger.info(`[v] Message received: ${this.subject} / Queue: ${this.queueGroupName}`);

          try {
            const parsedData = JSON.parse(msg.content.toString()) as T['data'];
            await this.onMessage(parsedData, msg);
            this.channel.ack(msg);
          } catch (err) {
            logger.error({ msg: `Error processing: ${this.subject}`, error: err });
            this.channel.nack(msg, false, false); 
          }
        }
      },
      { noAck: false }
    );
  }
}