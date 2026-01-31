import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroBannerComponent } from './components/hero-banner/hero-banner.component';
import { PropertyFilterComponent } from '@/app/shared/property-filter/property-filter.component';
import { ListPropertyComponent } from '@/app/shared/list-property/list-property.component';
import { ChatBotComponent } from '@/app/shared/chat-bot/chat-bot.component';
import { PROPERTIES_MOCK } from '@/app/data/properties.data';
import { Property } from '@/app/types/property';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { IonButton, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { RealEstateBinBrazilComponent } from './components/real-estate-bin-brazil/real-estate-bin-brazil.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    HeroBannerComponent,
    PropertyFilterComponent,
    ListPropertyComponent,
    ChatBotComponent,
    RealEstateBinBrazilComponent,
    ContactSectionComponent,
    CommonModule,
    IonButton,
    IonSpinner,
    IonIcon,
  ],
})
export class HomePage implements OnInit {
  @ViewChild(ChatBotComponent) private chatBot?: ChatBotComponent;
  private bo = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  isMobile = false;
  isChatPulseActive = false;
  private chatPulseIntervalId?: ReturnType<typeof setInterval>;

  @ViewChild('imoveisRef') imoveisRef?: ElementRef;

  constructor() {}

  private readonly allProperties = [...PROPERTIES_MOCK].sort((a, b) => {
    const featuredA = Number(Boolean(a.featured));
    const featuredB = Number(Boolean(b.featured));
    return featuredB - featuredA;
  });

  private readonly pageSize = 5;
  visiblePropertiesCount = this.pageSize;

  get visibleProperties(): Property[] {
    return this.allProperties.slice(
      0,
      Math.min(this.visiblePropertiesCount, this.allProperties.length),
    );
  }

  get canLoadMoreProperties(): boolean {
    return this.visiblePropertiesCount < this.allProperties.length;
  }

  filteredProperties: Property[] = [];
  hasSearched = false;
  seeMore = false;

  ngOnInit() {
    this.bo
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((r) => (this.isMobile = r.matches));

    this.destroyRef.onDestroy(() => {
      if (this.chatPulseIntervalId) {
        clearInterval(this.chatPulseIntervalId);
      }
    });

    setTimeout(() => {
      if (!this.isChatOpen) {
        this.triggerChatPulse();
      }
    }, 600); // Trigger a chat pulse after 600ms

    this.chatPulseIntervalId = setInterval(() => {
      if (!this.isChatOpen) {
        this.triggerChatPulse();
      }
    }, 15_000); // Trigger a chat pulse every 15 seconds
  }

  isChatOpen = false;

  onFiltersApplied(properties: Property[]): void {
    this.filteredProperties = properties;
    this.hasSearched = true;
  }

  onClearFilters(): void {
    this.filteredProperties = [];
    this.hasSearched = false;
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      setTimeout(() => {
        this.chatBot?.scrollToLatest();
      }, 0);
    }
  }

  openChat(): void {
    this.isChatOpen = true;
    setTimeout(() => {
      this.chatBot?.scrollToLatest();
    }, 0);
  }

  onChatPulseAnimationEnd(event: AnimationEvent): void {
    if (event.animationName !== 'chatPulse') return;
    this.isChatPulseActive = false;
  }

  // Trigger a chat pulse animation if the chat is not open
  private triggerChatPulse(): void {
    if (this.isChatPulseActive) {
      this.isChatPulseActive = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.isChatPulseActive = true;
        });
      });
      return;
    }

    this.isChatPulseActive = true;
  }

  // Scroll to the property filter section
  scrollToFilter(): void {
    if (this.isMobile) {
      document.getElementById('filtro')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      this.imoveisRef?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  loadMoreProperties(): void {
    if (this.seeMore || !this.canLoadMoreProperties) return;

    this.seeMore = true;
    setTimeout(() => {
      this.visiblePropertiesCount = Math.min(
        this.visiblePropertiesCount + this.pageSize,
        this.allProperties.length,
      );
      this.seeMore = false;
    }, 600);
  }
}
