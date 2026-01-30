import { Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
  IonText,
  ModalController,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { RealEstateModalComponent } from '../real-estate-modal/real-estate-modal.component';

@Component({
  selector: 'app-card-property',
  templateUrl: './card-property.component.html',
  styleUrls: ['./card-property.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonSpinner,
    IonText,
    TranslateModule,
  ],
})
export class CardPropertyComponent {
  @Input() property?: PropertyCardProperty | null;
  @Input() loading = false;

  constructor(private modalCtrl: ModalController) {}

  private readonly priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

  get formattedPrice(): string {
    const value = this.property?.price;
    if (value == null || Number.isNaN(Number(value))) {
      return '';
    }

    return this.priceFormatter.format(Number(value));
  }

  get resolvedImageUrl(): string {
    return (
      this.property?.imageUrl?.trim() ||
      this.property?.images?.find((url) => url?.trim())?.trim() ||
      ''
    );
  }

  get resolvedCity(): string {
    return (
      this.property?.city?.trim() || this.property?.location?.city?.trim() || ''
    );
  }

  get resolvedState(): string {
    return (
      this.property?.state?.trim() ||
      this.property?.location?.state?.trim() ||
      ''
    );
  }

  async onCardClick(property: PropertyCardProperty) {
    const modal = await this.modalCtrl.create({
      component: RealEstateModalComponent,
      cssClass: 'real-estate-modal',
      componentProps: {
        property,
      },
    });

    await modal.present();

    await modal.onWillDismiss();
  }
}

export type PropertyCardProperty = {
  id: number | string;
  title: string;
  description: string;
  type?: string;
  price: number;
  city?: string;
  state?: string;
  featured?: boolean;
  imageUrl?: string;
  location?: {
    city: string;
    state: string;
  };
  images?: string[];
};
