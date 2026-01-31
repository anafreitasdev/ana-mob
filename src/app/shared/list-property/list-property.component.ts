import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CardPropertyComponent,
  PropertyCardProperty,
} from '@/app/shared/card-property/card-property.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss'],
  standalone: true,
  imports: [CardPropertyComponent, TranslateModule],
})
export class ListPropertyComponent {
  @Input() properties?: PropertyCardProperty[] | null;
  @Input() loading = false;
  @Output() messageSent = new EventEmitter<void>();

  readonly loadingItems = Array.from({ length: 6 });
}
