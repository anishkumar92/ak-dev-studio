import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

interface QuickLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <!-- Main Footer Content -->
        <div class="footer-content">
          <!-- Brand Section -->
          <div class="footer-brand">
            <div class="brand">
              <span class="brand-text">AK</span>
              <span class="brand-code">&lt;/dev&gt;</span>
              <span class="brand-suffix">Studio</span>
            </div>
            <p class="brand-description">
              {{ description }}
            </p>
            <div class="social-links">
              <a 
                *ngFor="let social of socialLinks" 
                [href]="social.url" 
                class="social-link"
                [attr.aria-label]="social.label"
                target="_blank" 
                rel="noopener noreferrer">
                <i [class]="social.icon"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h3 class="section-title">Quick Links</h3>
            <ul class="link-list">
              <li *ngFor="let link of quickLinks">
                <a 
                  [href]="link.url" 
                  class="footer-link"
                  (click)="scrollToSection($event, link.url)">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-section">
            <h3 class="section-title">Services</h3>
            <ul class="link-list">
              <li *ngFor="let service of services">
                <span class="service-item">{{ service }}</span>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-section">
            <h3 class="section-title">Contact</h3>
            <div class="contact-info">
              <div class="contact-item">
                <i class="bi bi-geo-alt contact-icon"></i>
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div class="contact-item">
                <i class="bi bi-envelope contact-icon"></i>
                <a href="mailto:anishkumar@gmail.com" class="contact-link">
                  anishkumar&#64;gmail.com
                </a>
              </div>
              <div class="contact-item">
                <i class="bi bi-telephone contact-icon"></i>
                <span>+91 9566087098</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-divider"></div>
          <div class="footer-bottom-content">
            <p class="copyright">
              {{ copyrightText }}
            </p>
            <div class="footer-bottom-links">
              <span class="made-with">
                Made with <i class="bi bi-heart-fill heart"></i> using Angular
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private isBrowser = false;

  description = 'Senior Angular Developer specializing in crafting high-performance web applications. Available for freelance projects and full-time opportunities.';
  
  copyrightText = `© ${new Date().getFullYear()} AK Dev Studio. All rights reserved.`;

  socialLinks: SocialLink[] = [
    { icon: 'bi bi-github', url: 'https://github.com/anishkumar92', label: 'GitHub' },
    { icon: 'bi bi-linkedin', url: 'https://linkedin.com/in/anish-srinivaasan', label: 'LinkedIn' },
    { icon: 'bi bi-twitter', url: 'https://twitter.com/anishkumar92', label: 'Twitter' },
    { icon: 'bi bi-envelope', url: 'mailto:anishkumar@gmail.com', label: 'Email' }
  ];

  quickLinks: QuickLink[] = [
    { label: 'About', url: '/about' },
    { label: 'Experience', url: '/experience' },
    { label: 'Skills', url: '/skills' },
    { label: 'Projects', url: '/projects' },
    { label: 'Contact', url: '/contact' }
  ];

  services: string[] = [
    'Frontend Development',
    'Angular Applications',
    'UI/UX Design',
    'Web Consulting',
    'Code Review',
    'Technical Mentoring'
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
}