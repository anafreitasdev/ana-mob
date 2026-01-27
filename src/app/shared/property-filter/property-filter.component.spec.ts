import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropertyFilterComponent } from './property-filter.component';

describe('PropertyFilterComponent', () => {
  let component: PropertyFilterComponent;
  let fixture: ComponentFixture<PropertyFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PropertyFilterComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
