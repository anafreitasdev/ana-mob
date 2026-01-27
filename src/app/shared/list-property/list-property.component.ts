import { Component, Input } from '@angular/core';
import {
  CardPropertyComponent,
  PropertyCardProperty,
} from '@/app/shared/card-property/card-property.component';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss'],
  standalone: true,
  imports: [CardPropertyComponent],
})
export class ListPropertyComponent {
  @Input() properties?: PropertyCardProperty[] | null;
  @Input() loading = false;

  readonly loadingItems = Array.from({ length: 6 });
}
