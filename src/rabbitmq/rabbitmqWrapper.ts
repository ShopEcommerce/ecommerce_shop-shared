import { connect, Connection, Channel } from 'amqplib';
import pino from 'pino';

const logger = pino();

class RabbitMQWrapper {
  private _client?: Connection;
  private _channel?: Channel;

  get client(): Connection {
    if (!this._client) {
      throw new Error('Cannot access RabbitMQ client before connecting');
    }
    return this._client;
  }

  get channel(): Channel {
    if (!this._channel) {
      throw new Error('Cannot access RabbitMQ channel before connecting');
    }
    return this._channel;
  }

  async connect(url: string, retryCount = 5): Promise<void> {
    while (retryCount > 0) {
      try {
        const client = await connect(url);
        const channel = await client.createChannel();
        
        // Use an intermediate 'unknown' cast to satisfy TypeScript when
        // the upstream types don't exactly overlap but we know the runtime
        // values are correct.
        this._client = client as unknown as Connection;
        this._channel = channel as unknown as Channel;
        
        logger.info('[RabbitMQ] Connected successfully');

        client.on('error', (err) => {
          logger.error({ msg: '[RabbitMQ] Connection error', error: err });
        });

        client.on('close', () => {
          logger.warn('[RabbitMQ] Connection closed');
        });

        return; 
      } catch (err) {
        retryCount--;
        logger.warn(`[RabbitMQ] Failed to connect. Retries left: ${retryCount}`);
        
        if (retryCount === 0) {
          logger.error('[RabbitMQ] Exhausted all retries. Crashing process...');
          throw err;
        }
        
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  async close() {
    if (this._channel) {
      await this._channel.close();
    }
    if (this._client) {
      await (this._client as any).close();
    }
  }
}

export const rabbitmqWrapper = new RabbitMQWrapper();