import { Component } from '@angular/core';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { PropertyFilterComponent } from '@/app/shared/property-filter/property-filter.component';
import { ListPropertyComponent } from '@/app/shared/list-property/list-property.component';
import { PROPERTIES_MOCK } from '@/app/data/properties.data';
import { Property } from '@/app/types/property';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    HeroSliderComponent,
    PropertyFilterComponent,
    ListPropertyComponent,
  ],
})
export class HomePage {
  readonly featuredProperties = PROPERTIES_MOCK.filter(
    (property) => property.featured,
  );

  filteredProperties: Property[] = [];
  hasSearched = false;

  onFiltersApplied(properties: Property[]): void {
    this.filteredProperties = properties;
    this.hasSearched = true;
  }
}
