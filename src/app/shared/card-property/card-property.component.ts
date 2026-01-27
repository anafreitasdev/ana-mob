import { Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';

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
  ],
})
export class CardPropertyComponent {
  @Input() property?: PropertyCardProperty | null;
  @Input() loading = false;

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
}

export type PropertyCardProperty = {
  id: number | string;
  title: string;
  description: string;
  price: number;
  city?: string;
  state?: string;
  imageUrl?: string;
  location?: {
    city: string;
    state: string;
  };
  images?: string[];
};
