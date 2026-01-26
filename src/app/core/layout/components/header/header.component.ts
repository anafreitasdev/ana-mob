import { Component, HostListener, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar } from '@ionic/angular/standalone';

const styled = {
  headerContainer: 'bg-surface text-text-primary shadow-sm',
  headerInner: 'max-w-6xl mx-auto flex items-center justify-between py-3',
  brand: 'text-primary font-semibold text-lg tracking-tight',
  navListDesktop: 'hidden md:flex items-center gap-8',
  navItemDesktop:
    'text-sm font-medium text-text-secondary hover:text-primary transition-colors',
  mobileToggleButton:
    'md:hidden inline-flex items-center justify-center p-2 rounded-md text-text-primary hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary',
  mobileOverlay:
    'fixed inset-0 z-50 bg-black/40 transition-opacity duration-200',
  mobilePanel:
    'fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm bg-surface shadow-xl transition-transform duration-200',
  mobilePanelHeader:
    'flex items-center justify-between px-4 py-4 border-b border-border',
  mobileCloseButton:
    'inline-flex items-center justify-center p-2 rounded-md hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary',
  navListMobile: 'flex flex-col py-3',
  navItemMobile:
    'w-full text-left px-4 py-2 text-sm font-medium text-text-primary hover:text-primary hover:bg-background',
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar],
})
export class HeaderComponent implements OnDestroy {
  readonly styled = styled;

  mobileMenuOpen = false;

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
      return;
    }

    this.openMobileMenu();
  }

  openMobileMenu(): void {
    this.mobileMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  scrollTo(anchor: string, event?: Event): void {
    event?.preventDefault();

    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.closeMobileMenu();
  }
}
