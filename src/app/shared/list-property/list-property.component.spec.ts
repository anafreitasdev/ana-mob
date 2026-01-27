import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPropertyComponent } from './list-property.component';

describe('ListPropertyComponent', () => {
  let component: ListPropertyComponent;
  let fixture: ComponentFixture<ListPropertyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListPropertyComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
