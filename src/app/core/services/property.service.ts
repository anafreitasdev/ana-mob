import { Injectable } from '@angular/core';
import { PROPERTIES_MOCK } from '../../data/mocks/properties.mock';
import { PropertyLocation } from '@/app/types/property';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private properties = PROPERTIES_MOCK;

  constructor() {}

  filterPropertiesByType(type: string) {
    return this.properties.filter((property) => property.type === type);
  }

  getAllProperties() {
    return this.properties;
  }

  /**
   * Filtra as propriedades com base no tipo, localização e preço.
   * @param type The type of property to be filtered.
   * @param location The location of the property to be filtered.
   * @param price The maximum price of the property to be filtered.
   * @returns An array of properties that match the filtering criteria.
   */
  filterPropertiesByTypeAndLocationAndPrice(
    type: string,
    location: PropertyLocation,
    priceMin: number,
    priceMax: number,
  ) {
    let properties = this.properties;
    if (type) {
      properties = properties.filter((property) => property.type === type);
    }

    if (location.city) {
      properties = properties.filter(
        (property) => property.location.city === location.city,
      );
    }
    if (location.state) {
      properties = properties.filter(
        (property) => property.location.state === location.state,
      );
    }

    if (priceMin) {
      properties = properties.filter((property) => property.price >= priceMin);
    }

    if (priceMax) {
      properties = properties.filter((property) => property.price <= priceMax);
    }

    return properties;
  }
}
