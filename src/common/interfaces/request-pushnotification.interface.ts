export interface IRequestPushnotification {
    template?: 'request-contact' | 'send-message-user' | 'accept-request-contact';
    to: string[];
    app: 'italk';
    data?: any;
    title?: string;
    message?: string;
}