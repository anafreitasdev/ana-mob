import {
  AfterViewInit,
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
import { TranslateModule, TranslateService as NgxTranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBotComponent implements AfterViewInit {
  private readonly chatBotService = inject(ChatBotService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngxTranslate = inject(NgxTranslateService);
  private isDestroyed = false;
  private didInitialAutoScroll = false;

  @ViewChild(IonContent) private readonly content?: IonContent;

  private readonly storageKey = 'ana-mob.chat.messages.v1';

  messages: ChatMessage[] = this.readStoredMessages();
  draftMessage = '';

  private pendingBotResponses = 0;
  isBotTyping = false;

  activeDateLabel = '';
  private activeDateKey: string | null = null;
  private scrollElement?: HTMLElement;
  private messageElements: HTMLElement[] = [];
  private scrollRafId: number | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.isDestroyed = true;
      if (this.scrollRafId != null) {
        cancelAnimationFrame(this.scrollRafId);
      }
      if (this.scrollElement) {
        this.scrollElement.removeEventListener('scroll', this.onScroll);
      }
    });

    if (this.messages.length === 0) {
      this.messages = this.withStoredMessages([
        this.buildMessage('bot', this.ngxTranslate.instant('CHAT.WELCOME')),
      ]);
    }

    this.ngxTranslate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this.activeDateKey) {
          return;
        }
        this.activeDateLabel = this.formatConversationDayLabel(
          this.fromDateKey(this.activeDateKey),
        );
        this.requestRender();
      });
  }

  ngAfterViewInit(): void {
    this.content?.getScrollElement().then((scrollEl) => {
      this.scrollElement = scrollEl;
      this.scrollElement.addEventListener('scroll', this.onScroll, {
        passive: true,
      });

      this.scheduleReindexAndDateRefresh();
      this.scrollToLatest();
    });
  }

  scrollToLatest(): void {
    this.scrollToBottom();
    setTimeout(() => {
      this.scrollToBottom();
      this.scheduleReindexAndDateRefresh();
    }, 150);
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
    this.scheduleReindexAndDateRefresh();

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
          this.scheduleReindexAndDateRefresh();
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

  dateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private onBotResponseFinished(): void {
    this.pendingBotResponses = Math.max(0, this.pendingBotResponses - 1);
    this.isBotTyping = this.pendingBotResponses > 0;
    this.requestRender();
  }

  private scrollToBottom(): void {
    if (!this.didInitialAutoScroll) {
      this.didInitialAutoScroll = true;
      setTimeout(() => this.scrollToBottom(), 400);
    }
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

  private readonly onScroll = (): void => {
    if (this.scrollRafId != null) {
      return;
    }

    this.scrollRafId = requestAnimationFrame(() => {
      this.scrollRafId = null;
      this.updateActiveDateFromScroll();
    });
  };

  private scheduleReindexAndDateRefresh(): void {
    setTimeout(() => {
      this.reindexMessageElements();
      this.updateActiveDateFromScroll();
    }, 0);
  }

  private reindexMessageElements(): void {
    if (!this.scrollElement) {
      return;
    }

    this.messageElements = Array.from(
      this.scrollElement.querySelectorAll<HTMLElement>('[data-chat-message="true"]'),
    );
  }

  private updateActiveDateFromScroll(): void {
    if (!this.scrollElement || this.messageElements.length === 0) {
      if (this.activeDateKey !== null || this.activeDateLabel !== '') {
        this.activeDateKey = null;
        this.activeDateLabel = '';
        this.requestRender();
      }
      return;
    }

    const scrollTop = this.scrollElement.scrollTop;
    const threshold = 24;

    let activeEl: HTMLElement | undefined;
    for (const el of this.messageElements) {
      if (el.offsetTop <= scrollTop + threshold) {
        activeEl = el;
      } else {
        break;
      }
    }

    activeEl ??= this.messageElements[0];
    const nextKey = activeEl.dataset['dateKey'] ?? null;
    if (!nextKey || nextKey === this.activeDateKey) {
      return;
    }

    this.activeDateKey = nextKey;
    this.activeDateLabel = this.formatConversationDayLabel(this.fromDateKey(nextKey));
    this.requestRender();
  }

  private fromDateKey(key: string): Date {
    const [y, m, d] = key.split('-').map((value) => Number(value));
    return new Date(y, Math.max(0, m - 1), d);
  }


  // Format the date of the conversation into a user-friendly label.
  private formatConversationDayLabel(date: Date): string {
    const now = new Date();
    const todayKey = this.dateKey(now);
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const yesterdayKey = this.dateKey(yesterday);
    const key = this.dateKey(date);

    if (key === todayKey) {
      return this.ngxTranslate.instant('COMMON.TODAY');
    }
    if (key === yesterdayKey) {
      return this.ngxTranslate.instant('COMMON.YESTERDAY');
    }

    const locale =
      this.ngxTranslate.getCurrentLang() ||
      this.ngxTranslate.getFallbackLang() ||
      'pt-BR';
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}
