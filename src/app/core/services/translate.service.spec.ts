import { TestBed } from '@angular/core/testing';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';

import { TranslateService } from './translate.service';

class NgxTranslateServiceMock {
  addLangs(): void {}
  setDefaultLang(): void {}
  use(): void {}
  getCurrentLang(): string {
    return 'pt-BR';
  }
}

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxTranslateService, useClass: NgxTranslateServiceMock },
      ],
    });
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
