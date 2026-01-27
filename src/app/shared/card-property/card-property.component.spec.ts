import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardPropertyComponent } from './card-property.component';

describe('CardPropertyComponent', () => {
  let component: CardPropertyComponent;
  let fixture: ComponentFixture<CardPropertyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CardPropertyComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
