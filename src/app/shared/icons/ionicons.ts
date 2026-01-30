import { addIcons } from 'ionicons';

import {
  add,
  businessOutline,
  callOutline,
  close,
  home,
  homeOutline,
  languageOutline,
  menu,
  menuOutline,
  personCircleOutline,
} from 'ionicons/icons';

export function registerIonicons() {
  addIcons({
    add,
    close,
    home,
    menu,
    'home-outline': homeOutline,
    'person-circle-outline': personCircleOutline,
    'call-outline': callOutline,
    'language-outline': languageOutline,
    'business-outline': businessOutline,
    'menu-outline': menuOutline,
  });
}
