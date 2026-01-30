import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, IonButton, IonIcon],
})
export class HeroBannerComponent implements OnInit {
  private readonly bo = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);

  @Output() readonly searchProperties = new EventEmitter<void>();
  @Output() readonly talkToSpecialist = new EventEmitter<void>();

  isMobile = false;

  ngOnInit(): void {
    this.bo
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((r) => (this.isMobile = r.matches));
  }
}

