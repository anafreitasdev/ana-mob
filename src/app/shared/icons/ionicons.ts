import { addIcons } from 'ionicons';

import {
  add,
  businessOutline,
  callOutline,
  cashOutline,
  close,
  closeOutline,
  home,
  homeOutline,
  languageOutline,
  locationOutline,
  mailOutline,
  menu,
  menuOutline,
  personCircleOutline,
  searchOutline,
  starOutline,
  logoFacebook,
  logoInstagram,
  logoWhatsapp,
  chatbubbleEllipsesOutline,
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
    'location-outline': locationOutline,
    'cash-outline': cashOutline,
    'mail-outline': mailOutline,
    'logo-facebook': logoFacebook,
    'logo-instagram': logoInstagram,
    'logo-whatsapp': logoWhatsapp,
    'chatbubble-ellipses-outline': chatbubbleEllipsesOutline,
  });
}
