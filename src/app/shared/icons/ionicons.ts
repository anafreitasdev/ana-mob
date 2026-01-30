import { addIcons } from 'ionicons';

import {
  add,
  businessOutline,
  callOutline,
  close,
  closeOutline,
  home,
  homeOutline,
  languageOutline,
  menu,
  menuOutline,
  personCircleOutline,
  searchOutline,
  starOutline,
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
    'search-outline': searchOutline,
    'close-outline': closeOutline,
    'star-outline': starOutline,
  });
}
