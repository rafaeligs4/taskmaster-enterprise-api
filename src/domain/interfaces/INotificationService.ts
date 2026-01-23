
export interface INotificationService {
    connect(): Promise<void>;
    publishMessage(email: string, subject: string, body: string): Promise<boolean>;
}