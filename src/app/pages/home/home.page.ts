import { Component } from '@angular/core';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';
import { PropertyFilterComponent } from '@/app/shared/property-filter/property-filter.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [HeroSliderComponent, PropertyFilterComponent],
})
export class HomePage {
  constructor() {}
}
