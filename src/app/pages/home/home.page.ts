import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { PropertyFilterComponent } from '@/app/shared/property-filter/property-filter.component';
import { ListPropertyComponent } from '@/app/shared/list-property/list-property.component';
import { ChatBotComponent } from '@/app/shared/chat-bot/chat-bot.component';
import { PROPERTIES_MOCK } from '@/app/data/properties.data';
import { Property } from '@/app/types/property';
import { BreakpointObserver } from '@angular/cdk/layout';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

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
    CommonModule,
],
})
export class HomePage implements OnInit {
  @ViewChild(ChatBotComponent) private chatBot?: ChatBotComponent;
  private bo = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  isMobile = false;

  constructor() {}

  readonly featuredProperties = PROPERTIES_MOCK.filter(
    (property) => property.featured,
  );

  filteredProperties: Property[] = [];
  hasSearched = false;
  absoluteFilter = true;

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

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      setTimeout(() => {
        this.chatBot?.scrollToLatest();
      }, 0);
    }
  }
}
