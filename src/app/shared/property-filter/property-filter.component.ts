import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { PROPERTIES_MOCK } from '@/app/data/mocks/properties.mock';

@Component({
  selector: 'app-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
  ],
})
export class PropertyFilterComponent {
  constructor() {}

  readonly stateOptions = this.buildStateOptions();

  selectedStateCode = '';
  selectedCityName = '';

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
