import { Channel } from 'amqplib';
import { Event } from '../events/baseEvent';
import pino from 'pino';

const logger = pino();

export abstract class BasePublisher<T extends Event> {
  abstract subject: T['subject'];
  protected channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  async publish(data: T['data']): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.channel.assertExchange(this.subject, 'fanout', { durable: true });
        const payload = Buffer.from(JSON.stringify(data));
        this.channel.publish(this.subject, '', payload, {
          persistent: true,
          contentType: 'application/json',
          messageId: data.id,
          timestamp: Date.now(),
          headers: {
            'x-correlation-id': data.correlationId ?? data.id,
            'x-event-version': data.version,
          },
        });

        logger.info(`[x] Event published: ${this.subject}`);
        resolve();
      } catch (err) {
        logger.error({ msg: `Failed to publish ${this.subject}`, error: err });
        reject(err);
      }
    });
  }
}