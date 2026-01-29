import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { PROPERTIES_MOCK } from '@/app/data/properties.data';
import { PropertyService } from '@/app/core/services/property.service';
import { Property } from '@/app/types/property';
import {
  formatPtBrMoney,
  parsePtBrMoneyToNumber,
} from '@/app/utils/format-numbers.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.scss'],
  standalone: true,
  imports: [FormsModule, IonSelect, IonSelectOption, IonInput, IonButton, CommonModule],
})
export class PropertyFilterComponent {
  private readonly propertyService = inject(PropertyService);

  readonly stateOptions = this.buildStateOptions();

  @Output() readonly filtersApplied = new EventEmitter<Property[]>();
  @Input() absolute: false | true = false;

  selectedType = '';
  selectedStateCode = '';
  selectedCityName = '';
  priceMinRaw = '';
  priceMaxRaw = '';

  get cityOptions(): string[] {
    const state = this.stateOptions.find(
      (option) => option.code === this.selectedStateCode,
    );
    return state?.cities ?? [];
  }

  onSelectedStateCodeChange(nextStateCode: string): void {
    this.selectedStateCode = nextStateCode;
    this.selectedCityName = '';
  }

  applyFilters(): void {
    const priceMin = parsePtBrMoneyToNumber(this.priceMinRaw);
    const priceMax = parsePtBrMoneyToNumber(this.priceMaxRaw);

    const filtered =
      this.propertyService.filterPropertiesByTypeAndLocationAndPrice(
        this.selectedType,
        { city: this.selectedCityName, state: this.selectedStateCode },
        priceMin,
        priceMax,
      );

    this.filtersApplied.emit(filtered);
  }

  onPriceMinInput(event: Event): void {
    const nextValue =
      (event as CustomEvent<{ value?: string | null }>).detail?.value ?? '';
    this.priceMinRaw = formatPtBrMoney(nextValue);
  }

  onPriceMaxInput(event: Event): void {
    const nextValue =
      (event as CustomEvent<{ value?: string | null }>).detail?.value ?? '';
    this.priceMaxRaw = formatPtBrMoney(nextValue);
  }

  onOnlyDigitsKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End',
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if ((event.ctrlKey || event.metaKey) && /^[acvxz]$/i.test(event.key)) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  private buildStateOptions(): Array<{ code: string; cities: string[] }> {
    const stateToCities = new Map<string, Set<string>>();

    for (const property of PROPERTIES_MOCK) {
      const state = property.location.state.trim();
      const city = property.location.city.trim();

      if (!stateToCities.has(state)) {
        stateToCities.set(state, new Set<string>());
      }

      stateToCities.get(state)?.add(city);
    }

    return Array.from(stateToCities.entries())
      .map(([code, citiesSet]) => ({
        code,
        cities: Array.from(citiesSet).sort((a, b) =>
          a.localeCompare(b, 'pt-BR'),
        ),
      }))
      .sort((a, b) => a.code.localeCompare(b.code, 'pt-BR'));
  }
}
