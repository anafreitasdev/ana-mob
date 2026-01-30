import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { TranslateModule } from '@ngx-translate/core';

type BrazilStateCard = {
  name: string;
  imageUrl: string;
  imageAltLocation: string;
  cities: string[];
};

@Component({
  selector: 'app-real-bestate-bin-brazil',
  templateUrl: './real-bestate-bin-brazil.component.html',
  styleUrls: ['./real-bestate-bin-brazil.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
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
        'https://images.unsplash.com/photo-1544989164-31dc3c645987?auto=format&fit=crop&w=1920&q=800',
      imageAltLocation: 'São Paulo, São Paulo',
      cities: ['São Paulo', 'Campinas', 'Santos'],
    },
    {
      name: 'Minas Gerais',
      imageUrl:
        'https://media.istockphoto.com/id/1351677112/pt/foto/a-quiet-historic-street-in-the-city-of-tiradentes-in-minas-gerais.jpg?s=612x612&w=0&k=20&c=47OemKd1XTeAiOrRA9JOk0DvZcWXbRATU7gKbvDlszE=',
      imageAltLocation: 'Ouro Preto, Minas Gerais',
      cities: ['Belo Horizonte', 'Uberlândia', 'Ouro Preto'],
    },
    {
      name: 'Paraná',
      imageUrl:
        'https://t3.ftcdn.net/jpg/05/22/77/60/360_F_522776067_C7l8uTlLuz4CbATfsBXMoize4MS6dtu4.jpg',
      imageAltLocation: 'Curitiba, Paraná',
      cities: ['Curitiba', 'Londrina', 'Maringá'],
    },
    {
      name: 'Rio de Janeiro',
      imageUrl:
        'https://media.istockphoto.com/id/534215078/pt/foto/vista-a%C3%A9rea-do-rio-de-janeiro.jpg?s=612x612&w=0&k=20&c=7UGZ6Z0jtq5MPTsbVQWCFcL06uCF4KvuDOYo2WXs9rg=',
      imageAltLocation: 'Rio de Janeiro, Rio de Janeiro',
      cities: ['Rio de Janeiro', 'Niterói', 'Petrópolis'],
    },
    {
      name: 'Rio Grande do Sul',
      imageUrl:
        'https://t4.ftcdn.net/jpg/04/54/21/71/360_F_454217171_xjACqjrvmjOMcKwkac5ZPDnL493JC6gN.jpg',
      imageAltLocation: 'Porto Alegre, Rio Grande do Sul',
      cities: ['Porto Alegre', 'Caxias do Sul', 'Gramado'],
    },
    {
      name: 'Santa Catarina',
      imageUrl:
        'https://media.istockphoto.com/id/1502541960/pt/foto/spectacular-view-of-a-huge-paddle-wheel-on-balneario-camboriu-city-beach.jpg?s=612x612&w=0&k=20&c=1RjAtzcZN3rvFUdrvnvjI27_gkA2xVR_YJD052GOjzY=',
      imageAltLocation: 'Florianópolis, Santa Catarina',
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
