import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeroSliderComponent } from './hero-slider.component';

describe('HeroSliderComponent', () => {
  let component: HeroSliderComponent;
  let fixture: ComponentFixture<HeroSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HeroSliderComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
