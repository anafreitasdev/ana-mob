import { ChatMessage } from '@/app/types/chat-message';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  private answers = [
    {
      keywords: ['hello', 'hi', 'oi', 'olá'],
      answer: 'Olá! 👋 Como posso te ajudar a encontrar o imóvel ideal?',
    },
    {
      keywords: ['price', 'valor', 'preço'],
      answer:
        'Os valores variam conforme localização e tipo do imóvel. Quer que eu te mostre algumas opções?',
    },
    {
      keywords: ['apartment', 'apartamento'],
      answer:
        'Temos ótimos apartamentos disponíveis! Você procura em qual cidade?',
    },
    {
      keywords: ['house', 'casa'],
      answer:
        'Casas são uma ótima escolha 🏡 Você prefere casa térrea ou duplex?',
    },
    {
      keywords: ['contact', 'contato'],
      answer:
        'Você pode entrar em contato conosco pelo formulário ou deixar seu telefone aqui 😊',
    },
  ];

  /**
   * Return bot response with simulated delay
   */
  getBotResponse(userMessage: string): Observable<ChatMessage> {
    const responseText = this.findBestAnswer(userMessage);
    const responseDelay = 3000;

    return of(responseText).pipe(
      delay(responseDelay),
      map((message) => ({
        id: crypto.randomUUID(),
        author: 'bot',
        message,
        timestamp: new Date(),
      })),
    );
  }

  private findBestAnswer(message: string): string {
    const normalizedMessage = message.toLowerCase();

    const found = this.answers.find((item) =>
      item.keywords.some((keyword) => normalizedMessage.includes(keyword)),
    );

    return (
      found?.answer ??
      'Entendi 😊 Pode me explicar um pouco melhor o que você procura?'
    );
  }
}
