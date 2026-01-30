import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RealEstateBinBrazilComponent } from './real-estate-bin-brazil.component';

describe('RealEstateBinBrazilComponent', () => {
  let component: RealEstateBinBrazilComponent;
  let fixture: ComponentFixture<RealEstateBinBrazilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RealEstateBinBrazilComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RealEstateBinBrazilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
