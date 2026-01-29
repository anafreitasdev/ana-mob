import { ChatMessage } from '@/app/types/chat-message';
import { TranslateService as AppTranslateService } from '@/app/core/services/translate.service';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  private readonly translateService = inject(AppTranslateService);

  private readonly englishMarkers = [
    'hi',
    'hello',
    'good morning',
    'good afternoon',
    'good evening',
    'please',
    'thanks',
    'thank you',
    'price',
    'contact',
    'house',
    'apartment',
    'looking for',
    'i want',
    'i am looking',
  ];

  private readonly portugueseMarkers = [
    'oi',
    'olá',
    'ola',
    'bom dia',
    'boa tarde',
    'boa noite',
    'por favor',
    'obrigado',
    'obrigada',
    'preço',
    'preco',
    'valor',
    'contato',
    'casa',
    'apartamento',
    'imóvel',
    'imovel',
    'imoveis',
    'imóveis',
    'quero',
    'procuro',
  ];

  private readonly intents = [
    {
      keywords: ['hello', 'hi', 'oi', 'olá'],
      pt: 'Olá! Como posso te ajudar a encontrar o imóvel ideal?',
      en: 'Hi! How can I help you find the ideal property?',
    },
    {
      keywords: ['price', 'valor', 'preço'],
      pt: 'Os valores variam conforme localização e tipo do imóvel. Quer que eu te mostre algumas opções?',
      en: 'Prices vary by location and property type. Want me to show you some options?',
    },
    {
      keywords: ['apartment', 'apartamento'],
      pt: 'Temos ótimos apartamentos disponíveis! Você procura em qual cidade?',
      en: 'We have great apartments available! Which city are you looking in?',
    },
    {
      keywords: ['house', 'casa'],
      pt: 'Casas são uma ótima escolha. Você prefere casa térrea ou duplex?',
      en: 'Houses are a great choice. Do you prefer a single-story home or a duplex?',
    },
    {
      keywords: ['contact', 'contato'],
      pt: 'Você pode entrar em contato conosco pelo formulário ou deixar seu telefone aqui.',
      en: 'You can contact us using the form, or leave your phone number here.',
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

    const found = this.intents.find((item) =>
      item.keywords.some((keyword) => normalizedMessage.includes(keyword)),
    );

    const lang = this.detectMessageLang(message) ?? this.translateService.current;
    const answer = found?.[lang === 'en-US' ? 'en' : 'pt'];
    if (answer) {
      return answer;
    }

    return lang === 'en-US'
      ? 'Got it. Can you tell me a bit more about what you are looking for?'
      : 'Entendi. Pode me explicar um pouco melhor o que você procura?';
  }

  private detectMessageLang(message: string): 'pt-BR' | 'en-US' | null {
    const raw = message.trim();
    if (!raw) return null;

    if (/[çãõáéíóúàèìòùâêîôû]/i.test(raw)) {
      return 'pt-BR';
    }

    const normalized = raw.toLowerCase();
    const enScore = this.englishMarkers.reduce(
      (count, marker) => count + (normalized.includes(marker) ? 1 : 0),
      0,
    );
    const ptScore = this.portugueseMarkers.reduce(
      (count, marker) => count + (normalized.includes(marker) ? 1 : 0),
      0,
    );

    if (enScore === 0 && ptScore === 0) {
      return null;
    }

    return enScore >= ptScore ? 'en-US' : 'pt-BR';
  }
}
