import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, IonIcon],
})
export class FooterComponent implements OnInit {
  private bo = inject(BreakpointObserver);
  private destroyRef = inject(DestroyRef);

  isMobile = false;
  readonly currentYear = new Date().getFullYear();

  constructor() {}

  ngOnInit() {
    this.bo
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((r) => (this.isMobile = r.matches));
  }
}
