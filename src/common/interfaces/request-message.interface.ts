export interface IRequestMessage {
  appId: 'italk';
  conversationId: string;
  date: Date;
  from: string;
  to: string;
  message: string;
  type: string;
  image?: string;
}
