import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { PropertyFilterComponent } from '@/app/shared/property-filter/property-filter.component';
import { ListPropertyComponent } from '@/app/shared/list-property/list-property.component';
import { ChatBotComponent } from '@/app/shared/chat-bot/chat-bot.component';
import { PROPERTIES_MOCK } from '@/app/data/properties.data';
import { Property } from '@/app/types/property';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RealBestateBinBrazilComponent } from './components/real-bestate-bin-brazil/real-bestate-bin-brazil.component';
import { IonButton, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    HeroSliderComponent,
    PropertyFilterComponent,
    ListPropertyComponent,
    ChatBotComponent,
    RealBestateBinBrazilComponent,
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
  absoluteFilter = true;
  seeMore = false;

  ngOnInit() {
    this.bo
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((r) => (this.isMobile = r.matches));
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
