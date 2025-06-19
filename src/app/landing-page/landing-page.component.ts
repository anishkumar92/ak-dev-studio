import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ProfileData {
  greeting: string;
  name: string;
  title: string;
  description: string;
  experience: number;
  githubUsername: string;
  githubUrl: string;
  email: string;
}

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  image: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-background">
        <div class="hero-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">
              <i class="bi bi-star-fill"></i>
              <span>{{ profileData.experience }}+ Years Experience</span>
            </div>
            <h1 class="hero-title">
              {{ profileData.greeting }}<br>
              <span class="highlight">{{ profileData.name }}</span><br>
              <span class="subtitle">{{ profileData.title }}</span>
            </h1>
            <p class="hero-description">{{ profileData.description }}</p>
            <div class="hero-actions">
              <a href="/contact" class="btn btn-primary" (click)="scrollToSection($event, '/contact')">
                <i class="bi bi-envelope"></i>
                Get In Touch
              </a>
              <a href="/projects" class="btn btn-secondary" (click)="scrollToSection($event, '/projects')">
                <i class="bi bi-folder"></i>
                View Projects
              </a>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-avatar">
              <img src="https://avatars.githubusercontent.com/u/17968335?v=4" 
                   alt="Anish Kumar" class="avatar-image">
              <div class="avatar-ring"></div>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">{{ profileData.experience }}+</span>
                <span class="stat-label">Years</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Projects</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">15+</span>
                <span class="stat-label">Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">About Me</h2>
          <p class="section-subtitle">Senior Frontend Developer with robust {{ profileData.experience }}+ years career</p>
        </div>
        <div class="about-content">
          <div class="about-text">
            <p class="about-description">
              Senior Frontend Developer with a robust {{ profileData.experience }}+ years career spanning Banking, Healthcare, and Telecom sectors. 
              My career is characterized by a deep-seated passion for Angular application development, marked by a strong commitment to crafting intuitive, high-performance web interfaces.
            </p>
            <div class="about-highlights">
              <div class="highlight-item">
                <i class="bi bi-lightning-charge highlight-icon"></i>
                <div>
                  <h4>Performance Focused</h4>
                  <p>Optimizing applications for speed and efficiency</p>
                </div>
              </div>
              <div class="highlight-item">
                <i class="bi bi-people highlight-icon"></i>
                <div>
                  <h4>Team Leadership</h4>
                  <p>Leading development teams and mentoring developers</p>
                </div>
              </div>
              <div class="highlight-item">
                <i class="bi bi-gear highlight-icon"></i>
                <div>
                  <h4>Modern Technologies</h4>
                  <p>Staying current with latest web development trends</p>
                </div>
              </div>
            </div>
          </div>
          <div class="about-visual">
            <div class="tech-stack">
              <div class="tech-item">Angular</div>
              <div class="tech-item">TypeScript</div>
              <div class="tech-item">RxJS</div>
              <div class="tech-item">NGRX</div>
              <div class="tech-item">Node.js</div>
              <div class="tech-item">AWS</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="section section-alt">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Work Experience</h2>
          <p class="section-subtitle">Journey through leading organizations</p>
        </div>
        <div class="experience-timeline">
          <div class="timeline-item" *ngFor="let exp of experienceData; let i = index">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h3 class="position">{{ exp.position }}</h3>
                <span class="company">{{ exp.company }}</span>
                <span class="duration">{{ exp.duration }}</span>
              </div>
              <p class="timeline-description">{{ exp.description }}</p>
              <div class="timeline-technologies">
                <span class="tech-tag" *ngFor="let tech of exp.technologies">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Technical Skills</h2>
          <p class="section-subtitle">Expertise across modern web technologies</p>
        </div>
        <div class="skills-grid">
          <div class="skill-category" *ngFor="let category of skillCategories">
            <h3 class="category-title">{{ category.name }}</h3>
            <div class="skills-list">
              <div class="skill-item" *ngFor="let skill of category.skills">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" [style.width.%]="skill.level"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section section-alt">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Projects</h2>
          <p class="section-subtitle">Personal projects showcasing my expertise</p>
        </div>
        <div class="projects-grid">
          <div class="project-card" *ngFor="let project of projectsData">
            <div class="project-image">
              <img [src]="project.image" [alt]="project.name">
              <div class="project-overlay">
                <div class="project-actions">
                  <a [href]="project.liveUrl" class="project-btn" target="_blank" *ngIf="project.liveUrl">
                    <i class="bi bi-eye"></i>
                  </a>
                  <a [href]="project.githubUrl" class="project-btn" target="_blank">
                    <i class="bi bi-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ project.name }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-technologies">
                <span class="tech-tag" *ngFor="let tech of project.technologies">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Let's Work Together</h2>
          <p class="section-subtitle">Ready to start your next project? Let's discuss how I can help.</p>
        </div>
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="bi bi-geo-alt"></i>
              </div>
              <div class="contact-details">
                <h4>Location</h4>
                <p>Chennai, Tamil Nadu, India</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="bi bi-envelope"></i>
              </div>
              <div class="contact-details">
                <h4>Email</h4>
                <p><a href="mailto:anishkumar&#64;gmail.com">anishkumar&#64;gmail.com</a></p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="bi bi-telephone"></i>
              </div>
              <div class="contact-details">
                <h4>Phone</h4>
                <p>+91 9566087098</p>
              </div>
            </div>
          </div>
          <div class="contact-action">
            <h3>Ready to collaborate?</h3>
            <p>I'm always interested in new opportunities and interesting projects.</p>
            <a href="mailto:anishkumar@gmail.com" class="btn btn-primary btn-large">
              <i class="bi bi-envelope"></i>
              Send me an Email
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Scroll to Top -->
    <button 
      class="scroll-top" 
      *ngIf="showScrollButton" 
      (click)="scrollToTop()"
      [attr.aria-label]="'Scroll to top'">
      <i class="bi bi-arrow-up"></i>
    </button>
  `,
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  showScrollButton = false;
  private isBrowser = false;

  profileData: ProfileData = {
    greeting: 'Hi 👋, I\'m',
    name: 'Anish Kumar Srinivaasan',
    title: 'Senior Angular Application Developer',
    description: 'Crafting intuitive, high-performance web interfaces with expertise across Banking, Healthcare, and Telecom sectors. Specializing in Angular, TypeScript, and modern frontend technologies.',
    experience: 11,
    githubUsername: 'anishkumar92',
    githubUrl: 'https://github.com/anishkumar92',
    email: 'anishkumar@gmail.com'
  };

  experienceData: Experience[] = [
    {
      position: 'Senior Frontend Developer - Angular',
      company: 'INFOMATICS, Chennai',
      duration: 'Dec 2023 - Current',
      description: 'Led End-to-End Development of RCA application using Angular 18. Architected application upgrade from AngularJS to Angular 17 and implemented custom UI components using Kendo UI.',
      technologies: ['Angular 18', 'TypeScript', 'Kendo UI', 'Azure DevOps']
    },
    {
      position: 'Senior Frontend Developer - Angular',
      company: 'LTI Mindtree, Chennai',
      duration: 'Mar 2021 - Dec 2023',
      description: 'Developed teller application for 1,000+ bank employees. Achieved 98% defect resolution rate and led Angular 4 to Angular 15 upgrade with 70% reduction in processing time.',
      technologies: ['Angular 15', 'NGRX', 'TypeScript', 'Digital Signature']
    },
    {
      position: 'Associate - Senior Frontend Developer',
      company: 'COGNIZANT, Chennai',
      duration: 'Apr 2019 - Feb 2021',
      description: 'Developed audit application for UK audit firms with advanced RxJS proficiency. Achieved 90% unit test coverage and 15% reduction in code defects.',
      technologies: ['Angular', 'RxJS', 'AWS S3', 'Responsive Design']
    }
  ];

  skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'Angular', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript', level: 88 },
        { name: 'RxJS', level: 85 }
      ]
    },
    {
      name: 'Backend & Tools',
      skills: [
        { name: 'Node.js', level: 70 },
        { name: 'AWS', level: 75 },
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 65 }
      ]
    },
    {
      name: 'Design & UI',
      skills: [
        { name: 'CSS/SCSS', level: 85 },
        { name: 'Bootstrap', level: 80 },
        { name: 'Figma', level: 70 },
        { name: 'Responsive Design', level: 90 }
      ]
    }
  ];

  projectsData: Project[] = [
    {
      name: 'Movie Picker',
      description: 'Angular-based movie recommendation app with personalized suggestions and TMDB API integration.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'TMDB API'],
      liveUrl: '/moviepicker',
      githubUrl: 'https://github.com/anishkumar92/PickAMovie',
      image: 'https://images.unsplash.com/photo-1489599735225-fa9b15b4e4a5?w=400&h=250&fit=crop'
    },
    {
      name: 'NPS Calculator',
      description: 'Tool for calculating National Pension Scheme contributions with chart visualizations.',
      technologies: ['Angular', 'TypeScript', 'Chart.js', 'Reactive Forms'],
      liveUrl: '/npscalculator',
      githubUrl: 'https://github.com/anishkumar92/nps-calculator',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
    },
    {
      name: 'Joke Teller BOT',
      description: 'Interactive Voice bot delivering jokes using JavaScript Speech API.',
      technologies: ['JavaScript', 'Speech API', 'Fetch API', 'HTML5'],
      liveUrl: '/joketeller',
      githubUrl: 'https://github.com/anishkumar92/jokeTeller',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop'
    },
    {
      name: 'Random Quote Generator',
      description: 'JavaScript application that generates and shares random inspirational quotes.',
      technologies: ['JavaScript', 'Fetch API', 'Twitter API', 'CSS3'],
      liveUrl: '/quotegenerator',
      githubUrl: 'https://github.com/anishkumar92/quote-generator',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.showScrollButton = window.pageYOffset > 300;
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

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}