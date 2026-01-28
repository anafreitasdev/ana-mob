export type ChatAuthor = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  message: string;
  timestamp: Date;
}

export interface ChatAnswer {
  keywords: string[];
  answer: string;
}
