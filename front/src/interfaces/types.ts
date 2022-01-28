export interface IContact {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
}

export interface IMessage {
  body: string;
  contact: IContact;
  date: Date;
  id: number;
  read: boolean;
  subject: string;
  type: string;
}
export interface IAgent {
  id: number;
  logo: string;
  name: string;
  unread_messages: number;
  messages: Array<IMessage>;
}
