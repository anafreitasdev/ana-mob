import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, IonIcon],
})
export class ContactSectionComponent {
  readonly phoneDisplay = '(11) 99999-9999';
  readonly phoneHref = 'tel:+5511999999999';
  readonly emailDisplay = 'contato@anaimoveis.com.br';
  readonly emailHref = 'mailto:contato@anaimoveis.com.br';
}
