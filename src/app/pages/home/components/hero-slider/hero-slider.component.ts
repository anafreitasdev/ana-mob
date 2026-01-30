import { NgFor, NgIf, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PROPERTIES_MOCK } from '@/app/data/properties.data';
import { Property } from '@/app/types/property';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, TranslateModule, IonButton, IonIcon],
})
export class HeroSliderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('track', { static: false })
  private readonly trackRef?: ElementRef<HTMLDivElement>;

  readonly featuredProperties: Property[] = PROPERTIES_MOCK;

  activeIndex = 0;

  private resizeObserver?: ResizeObserver;
  private rafId?: number;
  private bo = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  isMobile = false;

   ngOnInit() {
    this.bo.observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(r => (this.isMobile = r.matches));
  }

  ngAfterViewInit(): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;

    if (typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver(() => {
      this.scrollToIndex(this.activeIndex, false);
    });
    this.resizeObserver.observe(track);
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.resizeObserver?.disconnect();
  }

  onTrackScroll(): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const width = track.clientWidth;
      if (width === 0) return;

      const nextIndex = Math.round(track.scrollLeft / width);
      this.activeIndex = Math.min(
        Math.max(nextIndex, 0),
        Math.max(this.featuredProperties.length - 1, 0),
      );
    });
  }

  goToIndex(index: number): void {
    const nextIndex = this.getLoopedIndex(index);
    this.activeIndex = nextIndex;
    this.scrollToIndex(nextIndex, true);
  }

  goToPrevious(): void {
    this.goToIndex(this.activeIndex - 1);
  }

  goToNext(): void {
    this.goToIndex(this.activeIndex + 1);
  }

  trackByPropertyId(_: number, property: Property): number {
    return property.id;
  }

  private scrollToIndex(index: number, smooth: boolean): void {
    const track = this.trackRef?.nativeElement;
    if (!track) return;

    const width = track.clientWidth;
    track.scrollTo({
      left: width * index,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }

  private getLoopedIndex(index: number): number {
    const count = this.featuredProperties.length;
    if (count === 0) return 0;

    if (index < 0) return count - 1;
    if (index >= count) return 0;
    return index;
  }
}
