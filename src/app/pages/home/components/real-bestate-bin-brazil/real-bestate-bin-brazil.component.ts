import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';

type BrazilStateCard = {
  name: string;
  imageUrl: string;
  imageAlt: string;
  cities: string[];
};

@Component({
  selector: 'app-real-bestate-bin-brazil',
  templateUrl: './real-bestate-bin-brazil.component.html',
  styleUrls: ['./real-bestate-bin-brazil.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RealBestateBinBrazilComponent implements AfterViewInit {
  private static swiperRegistered = false;

  @ViewChild('swiper', { static: true })
  private readonly swiperRef?: ElementRef<
    HTMLElement & { initialize: () => void }
  >;

  private swiperInstance: any;
  isAtStart = true;
  isAtEnd = false;

  readonly states: BrazilStateCard[] = [
    {
      name: 'São Paulo',
      imageUrl:
        'https://images.unsplash.com/photo-1590611936760-eeb9bc598548?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Vista aérea de São Paulo, São Paulo',
      cities: ['São Paulo', 'Campinas', 'Santos'],
    },
    {
      name: 'Minas Gerais',
      imageUrl:
        'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Rua histórica em Ouro Preto, Minas Gerais',
      cities: ['Belo Horizonte', 'Uberlândia', 'Ouro Preto'],
    },
    {
      name: 'Paraná',
      imageUrl:
        'https://images.unsplash.com/photo-1612277795421-9bc5c6e6fbe7?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Jardim Botânico de Curitiba, Paraná',
      cities: ['Curitiba', 'Londrina', 'Maringá'],
    },
    {
      name: 'Rio de Janeiro',
      imageUrl:
        'https://images.unsplash.com/photo-1593995863953-4cda03e6b2c8?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Cristo Redentor no Rio de Janeiro, Rio de Janeiro',
      cities: ['Rio de Janeiro', 'Niterói', 'Petrópolis'],
    },
    {
      name: 'Rio Grande do Sul',
      imageUrl:
        'https://images.unsplash.com/photo-1593995863953-4cda03e6b2c8?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Paisagem urbana em Porto Alegre, Rio Grande do Sul',
      cities: ['Porto Alegre', 'Caxias do Sul', 'Gramado'],
    },
    {
      name: 'Santa Catarina',
      imageUrl:
        'https://images.unsplash.com/photo-1593995863953-4cda03e6b2c8?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Ponte e skyline em Florianópolis, Santa Catarina',
      cities: ['Florianópolis', 'Joinville', 'Balneário Camboriú'],
    },
  ];

  private readonly swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    loop: false,
    rewind: false,
    keyboard: { enabled: true },
    navigation: false,
    pagination: { clickable: true },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  };

  ngAfterViewInit(): void {
    if (!RealBestateBinBrazilComponent.swiperRegistered) {
      register();
      RealBestateBinBrazilComponent.swiperRegistered = true;
    }

    const swiperEl = this.swiperRef?.nativeElement as any;
    if (!swiperEl) return;

    Object.assign(swiperEl, this.swiperConfig);
    swiperEl.initialize();

    swiperEl.addEventListener('swiperinit', (event: any) => {
      const swiper = event?.detail?.[0] ?? swiperEl.swiper;
      this.setSwiperInstance(swiper);
    });

    swiperEl.addEventListener('swiperslidechange', (event: any) => {
      const swiper = event?.detail?.[0] ?? this.swiperInstance;
      this.setSwiperInstance(swiper);
    });

    this.setSwiperInstance(swiperEl.swiper);
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

  trackByStateName(_: number, state: BrazilStateCard): string {
    return state.name;
  }

  trackByCityName(_: number, city: string): string {
    return city;
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
}
