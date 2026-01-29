import { Component, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { PropertyFilterComponent } from '@/app/shared/property-filter/property-filter.component';
import { ListPropertyComponent } from '@/app/shared/list-property/list-property.component';
import { ChatBotComponent } from '@/app/shared/chat-bot/chat-bot.component';
import { PROPERTIES_MOCK } from '@/app/data/properties.data';
import { Property } from '@/app/types/property';

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
  ],
})
export class HomePage {
  @ViewChild(ChatBotComponent) private chatBot?: ChatBotComponent;

  readonly featuredProperties = PROPERTIES_MOCK.filter(
    (property) => property.featured,
  );

  filteredProperties: Property[] = [];
  hasSearched = false;

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
