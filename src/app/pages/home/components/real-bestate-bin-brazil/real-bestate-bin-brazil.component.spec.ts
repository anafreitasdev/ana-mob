import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RealBestateBinBrazilComponent } from './real-bestate-bin-brazil.component';

describe('RealBestateBinBrazilComponent', () => {
  let component: RealBestateBinBrazilComponent;
  let fixture: ComponentFixture<RealBestateBinBrazilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RealBestateBinBrazilComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RealBestateBinBrazilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
