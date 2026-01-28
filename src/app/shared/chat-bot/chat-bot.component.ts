import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonButton, IonContent, IonInput } from '@ionic/angular/standalone';
import { ChatBotService } from '@/app/core/services/chat-bot.service';
import { ChatMessage } from '@/app/types/chat-message';
import { formatTime } from '@/app/utils/date.util';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBotComponent {
  private readonly chatBotService = inject(ChatBotService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private isDestroyed = false;

  @ViewChild(IonContent) private readonly content?: IonContent;

  private readonly storageKey = 'ana-mob.chat.messages.v1';

  messages: ChatMessage[] = this.readStoredMessages();
  draftMessage = '';

  private pendingBotResponses = 0;
  isBotTyping = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.isDestroyed = true;
    });
  }

  get canSubmit(): boolean {
    return this.draftMessage.trim().length > 0;
  }

  onDraftInput(event: Event): void {
    const nextValue =
      (event as CustomEvent<{ value?: string | null }>).detail?.value ?? '';
    this.draftMessage = nextValue;
    this.requestRender();
  }

  onSubmit(): void {
    const text = this.draftMessage.trim();
    if (!text) {
      return;
    }

    this.messages = this.withStoredMessages([
      ...this.messages,
      this.buildMessage('user', text),
    ]);

    this.draftMessage = '';
    this.requestRender();
    this.scrollToBottom();

    this.pendingBotResponses += 1;
    this.isBotTyping = true;
    this.requestRender();

    this.chatBotService
      .getBotResponse(text)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (botMessage) => {
          this.messages = this.withStoredMessages([...this.messages, botMessage]);
          this.requestRender();
          this.scrollToBottom();
          this.onBotResponseFinished();
        },
        error: () => {
          this.onBotResponseFinished();
        },
      });
  }

  trackByMessageId(_: number, item: ChatMessage): string {
    return item.id;
  }

  formatTime(date: Date): string {
    return formatTime(date);
  }

  private onBotResponseFinished(): void {
    this.pendingBotResponses = Math.max(0, this.pendingBotResponses - 1);
    this.isBotTyping = this.pendingBotResponses > 0;
    this.requestRender();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.content?.scrollToBottom(200);
    }, 0);
  }

  private buildMessage(author: ChatMessage['author'], message: string): ChatMessage {
    return {
      id: crypto.randomUUID(),
      author,
      message,
      timestamp: new Date(),
    };
  }

  private requestRender(): void {
    Promise.resolve().then(() => {
      if (this.isDestroyed) {
        return;
      }
      this.cdr.detectChanges();
    });
  }

  private withStoredMessages(next: ChatMessage[]): ChatMessage[] {
    this.writeStoredMessages(next);
    return next;
  }

  private readStoredMessages(): ChatMessage[] {
    try {
      if (typeof localStorage === 'undefined') {
        return [];
      }

      const raw = localStorage.getItem(this.storageKey);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as Array<{
        id: string;
        author: ChatMessage['author'];
        message: string;
        timestamp: string;
      }>;

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter(
          (item) =>
            typeof item?.id === 'string' &&
            (item.author === 'user' || item.author === 'bot') &&
            typeof item.message === 'string' &&
            typeof item.timestamp === 'string',
        )
        .map((item) => ({
          id: item.id,
          author: item.author,
          message: item.message,
          timestamp: new Date(item.timestamp),
        }));
    } catch {
      return [];
    }
  }

  private writeStoredMessages(messages: ChatMessage[]): void {
    try {
      if (typeof localStorage === 'undefined') {
        return;
      }

      const payload = messages.map((item) => ({
        id: item.id,
        author: item.author,
        message: item.message,
        timestamp: item.timestamp.toISOString(),
      }));

      localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch {
      return;
    }
  }
}
