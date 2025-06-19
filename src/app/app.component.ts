import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LandingPageComponent],
  template: `
    <app-header></app-header>
    <main class="main-content">
      <app-landing-page></app-landing-page>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
    
    .main-content {
      padding-top: 80px; /* Account for fixed header */
    }
  `]
})
export class AppComponent {
  title = 'ak-dev-studio';
}