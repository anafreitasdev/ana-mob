import { Component } from '@angular/core';
import {
  IonContent,
  IonFooter,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '@/app/core/layout/components/header/header.component';
import { FooterComponent } from '@/app/core/layout/components/footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    IonContent,
    IonFooter,
    IonRouterOutlet,
  ],
})
export class LayoutComponent {
  constructor() {}
}
