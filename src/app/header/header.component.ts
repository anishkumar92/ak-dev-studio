import { Component, HostListener, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface NavigationItem {
  label: string;
  link: string;
  icon?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="container">
        <nav class="navbar">
          <!-- Brand Logo -->
          <a href="#home" class="brand" (click)="scrollToSection($event, '#home')">
            <span class="brand-text">AK</span>
            <span class="brand-code">&lt;/dev&gt;</span>
            <span class="brand-suffix">Studio</span>
          </a>

          <!-- Desktop Navigation -->
          <ul class="nav-links desktop-nav">
            <li *ngFor="let item of navigationItems" class="nav-item">
              <a 
                [href]="item.link" 
                class="nav-link" 
                [class.active]="activeSection === item.link.substring(1)"
                (click)="scrollToSection($event, item.link)">
                <i *ngIf="item.icon" [class]="item.icon"></i>
                {{ item.label }}
              </a>
            </li>
          </ul>

          <!-- Mobile Menu Toggle -->
          <button 
            class="mobile-toggle" 
            [class.active]="isMobileMenuOpen"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="isMobileMenuOpen">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </nav>

        <!-- Mobile Navigation -->
        <div class="mobile-nav" [class.open]="isMobileMenuOpen">
          <ul class="mobile-nav-links">
            <li *ngFor="let item of navigationItems" class="mobile-nav-item">
              <a 
                [href]="item.link" 
                class="mobile-nav-link"
                (click)="scrollToSection($event, item.link); closeMobileMenu()">
                <i *ngIf="item.icon" [class]="item.icon"></i>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  private isBrowser = false;

  navigationItems: NavigationItem[] = [
    { label: 'Home', link: '/home', icon: 'bi bi-house' },
    { label: 'About', link: '/about', icon: 'bi bi-person' },
    { label: 'Experience', link: '/experience', icon: 'bi bi-briefcase' },
    { label: 'Skills', link: '/skills', icon: 'bi bi-code-slash' },
    { label: 'Projects', link: '/projects', icon: 'bi bi-folder' },
    { label: 'Contact', link: '/contact', icon: 'bi bi-envelope' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateActiveSection();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    
    this.isScrolled = window.pageYOffset > 50;
    this.updateActiveSection();
  }

  scrollToSection(event: Event, target: string): void {
    event.preventDefault();
    
    if (!this.isBrowser) return;
    
    // Convert route to hash for scrolling
    const hash = target.startsWith('/') ? target.replace('/', '#') : target;
    const element = document.querySelector(hash);
    
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  private updateActiveSection(): void {
    if (!this.isBrowser) return;
    
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.activeSection = section.getAttribute('id') || '';
      }
    });
  }
}