import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
  ModalController,
  IonTextarea,
} from '@ionic/angular/standalone';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { TranslateModule } from '@ngx-translate/core';
import type { PropertyCardProperty } from '../card-property/card-property.component';

@Component({
  selector: 'app-real-estate-modal',
  templateUrl: './real-estate-modal.component.html',
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    TranslateModule,
    IonTextarea,
    NgFor,
    NgIf,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RealEstateModalComponent implements AfterViewInit {
  private static swiperRegistered = false;

  private readonly priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

  @ViewChild('swiper')
  private readonly swiperRef?: ElementRef<
    HTMLElement & { initialize: () => void }
  >;

  private swiperInstance: any;
  isAtStart = true;
  isAtEnd = false;

  @Input() property?: PropertyCardProperty;

  readonly form: Record<'name' | 'email' | 'phone' | 'message', string> = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  readonly formFields: Array<{
    type: 'input' | 'textarea';
    model: keyof RealEstateModalComponent['form'];
    inputType?: 'text' | 'email' | 'tel';
    labelKey: string;
    placeholderKey: string;
  }> = [
    {
      type: 'input',
      model: 'name',
      inputType: 'text',
      labelKey: 'REAL_ESTATE_MODAL.FORM.NAME.LABEL',
      placeholderKey: 'REAL_ESTATE_MODAL.FORM.NAME.PLACEHOLDER',
    },
    {
      type: 'input',
      model: 'email',
      inputType: 'email',
      labelKey: 'REAL_ESTATE_MODAL.FORM.EMAIL.LABEL',
      placeholderKey: 'REAL_ESTATE_MODAL.FORM.EMAIL.PLACEHOLDER',
    },
    {
      type: 'input',
      model: 'phone',
      inputType: 'tel',
      labelKey: 'REAL_ESTATE_MODAL.FORM.PHONE.LABEL',
      placeholderKey: 'REAL_ESTATE_MODAL.FORM.PHONE.PLACEHOLDER',
    },
    {
      type: 'textarea',
      model: 'message',
      labelKey: 'REAL_ESTATE_MODAL.FORM.MESSAGE.LABEL',
      placeholderKey: 'REAL_ESTATE_MODAL.FORM.MESSAGE.PLACEHOLDER',
    },
  ];

  get formattedPrice(): string {
    const value = this.property?.price;
    if (value == null || Number.isNaN(Number(value))) {
      return '';
    }

    return this.priceFormatter.format(Number(value));
  }

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit(): void {
    const imagesCount = this.property?.images?.length ?? 0;
    if (imagesCount <= 1) return;

    if (!RealEstateModalComponent.swiperRegistered) {
      register();
      RealEstateModalComponent.swiperRegistered = true;
    }

    const swiperEl = this.swiperRef?.nativeElement as any;
    if (!swiperEl) return;

    Object.assign(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 12,
      grabCursor: true,
      loop: false,
      rewind: false,
      keyboard: { enabled: true },
      navigation: false,
      pagination: { clickable: true },
    });

    swiperEl.initialize();

    swiperEl.addEventListener('swiperinit', () => {
      this.setSwiperInstance(swiperEl.swiper);
    });

    swiperEl.addEventListener('slidechange', () => {
      this.setSwiperInstance(swiperEl.swiper);
    });
    
    queueMicrotask(() => {
      this.setSwiperInstance(swiperEl.swiper);
    });
  }

  goToPrevious(): void {
    if (this.isAtStart) return;
    this.swiperInstance?.slidePrev?.();
    this.syncNavState();
  }

  goToNext(): void {
    if (this.isAtEnd) return;
    this.swiperInstance?.slideNext?.();
    this.syncNavState();
  }

  private setSwiperInstance(swiper: any): void {
    if (!swiper) return;
    this.swiperInstance = swiper;
    this.syncNavState();
  }

  private syncNavState(): void {
    const swiper = this.swiperInstance;
    if (!swiper) return;

    this.isAtStart = Boolean(swiper.isBeginning);
    this.isAtEnd = Boolean(swiper.isEnd);
  }

  close() {
    return this.modalCtrl.dismiss(null, 'close');
  }

  sendMessage() {
    this.modalCtrl.dismiss(null, 'send');
  }
}
