import amqp, { Channel, ChannelModel } from 'amqplib';
import { INotificationService } from '../../domain/interfaces/INotificationService';

export class RabbitMQProvider implements INotificationService {
    private connection: ChannelModel | null = null;
    private channel: Channel | null = null;

    // El nombre debe coincidir EXACTAMENTE con el que pusiste en Java
    private readonly QUEUE_NAME = 'email_notification_queue';

    constructor() {
        // Iniciamos la conexión al instanciar (o podrías hacerlo en un método init explícito)
        this.connect();
    }

    async connect() {
        try {
            const url = process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672';
            // Conectamos al RabbitMQ local (usuario/pass del docker-compose)
            this.connection = await amqp.connect(url);
            this.channel = await this.connection.createChannel();

            // Aseguramos que la cola exista (Idempotencia)
            await this.channel.assertQueue(this.QUEUE_NAME, {
                durable: true
            });

            console.log('🐰 Conectado a RabbitMQ exitosamente');
        } catch (error) {
            console.error('❌ Error conectando a RabbitMQ:', error);
        }
    }

    async publishMessage(email: string, subject: string, body: string): Promise<boolean> {
        if (!this.channel) {
            console.error('⚠️ No hay canal de RabbitMQ disponible');
            return false;
        }

        const message = {
            email,
            subject,
            body
        };

        // Convertimos el objeto a Buffer (RabbitMQ solo entiende bytes)
        const sent = this.channel.sendToQueue(
            this.QUEUE_NAME,
            Buffer.from(JSON.stringify(message)),
            {
                // Importante: le decimos a Java que esto es un JSON
                contentType: 'application/json'
            }
        );

        return sent;
    }
}