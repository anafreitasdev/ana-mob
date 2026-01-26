import { Component } from '@angular/core';
import { HeroSliderComponent } from './components/hero-slider/hero-slider.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [HeroSliderComponent],
})
export class HomePage {
  constructor() {}
}
