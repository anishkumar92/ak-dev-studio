import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface NavigationItem {
  label: string;
  link: string;
}

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

interface ProfileStat {
  value: string;
  label: string;
}

interface ContactInfo {
  icon: string;
  type: 'text' | 'link' | 'email';
  label: string;
  value: string;
}

interface Experience {
  position: string;
  company: string;
  duration: string;
  badgeClass: string;
  projects: {
    name: string;
    achievements: string[];
  }[];
  technologies: string[];
}

interface Skill {
  name: string;
  icon: string;
  bgClass: string;
  description: string;
  level: number;
  color: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  icon: string;
  gradient: string;
}

interface ContactMethod {
  icon: string;
  title: string;
  value: string;
  type: 'link' | 'text';
  url?: string;
}

interface SocialLink {
  icon: string;
  url: string;
}

interface QuickLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Navigation Component -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom">
      <div class="container">
        <a class="navbar-brand" href="#home">
          AK<span class="font-mono text-warning">&lt;/dev&gt;</span>Studio
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                [attr.aria-expanded]="isMenuOpen" (click)="toggleMobileMenu()">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav" [class.show]="isMenuOpen">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" *ngFor="let item of navigationItems">
              <a class="nav-link text-white" [href]="item.link" (click)="scrollToSection($event, item.link)">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section Component -->
    <section id="home" class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-8 hero-content text-white">
            <div class="badge-custom animate-fade-up">
              <i class="bi bi-star-fill me-2"></i>{{ profileData.experience }}+ Years Angular Expert
            </div>
            <h1 class="hero-title text-white animate-fade-up">
              {{ profileData.greeting }}<br>
              <span class="text-warning">{{ profileData.name }}</span><br>
              <span class="text-info">{{ profileData.title }}</span>
            </h1>
            <p class="hero-subtitle text-white animate-fade-up">
              {{ profileData.description }}
            </p>
            <div class="d-flex flex-wrap gap-3 animate-fade-up">
              <a [href]="'#contact'" class="btn btn-warning btn-custom" (click)="scrollToSection($event, '#contact')">
                <i class="bi bi-envelope me-2"></i>Get In Touch
              </a>
              <a [href]="'#projects'" class="btn btn-outline-light btn-custom" (click)="scrollToSection($event, '#projects')">
                <i class="bi bi-code-slash me-2"></i>View Projects
              </a>
              <a [href]="profileData.githubUrl" class="btn btn-outline-info btn-custom" target="_blank">
                <i class="bi bi-github me-2"></i>GitHub
              </a>
            </div>
            
            <!-- Profile Stats -->
            <div class="row mt-4">
              <div class="col-4" *ngFor="let stat of profileStats">
                <div class="text-center">
                  <h4 class="text-warning mb-0">{{ stat.value }}</h4>
                  <small class="text-light">{{ stat.label }}</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 text-center">
            <div class="position-relative animate-fade-right">
              <div class="bg-white rounded-circle p-4 shadow-lg d-inline-block hero-avatar">
                <i class="bi bi-person-circle text-primary" style="font-size: 8rem;"></i>
              </div>
              <div class="profile-badge">
                <img [src]="'https://komarev.com/ghpvc/?username=' + profileData.githubUsername + '&label=Profile%20views&color=0e75b6&style=flat'" 
                     alt="Profile views" class="img-fluid">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section Component -->
    <section id="about" class="section-padding bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="section-title text-dark animate-fade-up">About Me</h2>
            <p class="lead text-secondary">{{ aboutData.subtitle }}</p>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4">
            <div class="card card-custom h-100 animate-fade-left">
              <div class="card-body p-4">
                <div class="card-icon bg-primary mb-3">
                  <i class="bi bi-person-badge"></i>
                </div>
                <h4 class="mb-3 text-dark">{{ aboutData.professionalTitle }}</h4>
                <p class="text-secondary">{{ aboutData.description }}</p>
                
                <!-- Current Focus -->
                <div class="current-focus mt-4">
                  <h6 class="text-primary mb-2">Currently Working On:</h6>
                  <ul class="list-unstyled">
                    <li *ngFor="let project of currentProjects" class="mb-1">
                      <i class="bi bi-arrow-right text-success me-2"></i>
                      <span class="text-dark">{{ project }}</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Learning -->
                <div class="learning mt-3">
                  <h6 class="text-info mb-2">Currently Learning:</h6>
                  <span class="tech-badge" *ngFor="let tech of currentlyLearning">{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-4">
            <div class="card card-custom h-100 animate-fade-right">
              <div class="card-body p-4">
                <div class="card-icon bg-success mb-3">
                  <i class="bi bi-geo-alt"></i>
                </div>
                <h4 class="mb-3 text-dark">Contact Information</h4>
                <ul class="list-unstyled">
                  <li class="mb-2" *ngFor="let contact of contactInfo">
                    <i [class]="contact.icon + ' text-primary me-2'"></i>
                    <ng-container [ngSwitch]="contact.type">
                      <span *ngSwitchCase="'link'">
                        <a [href]="contact.value" target="_blank" class="text-decoration-none text-dark">{{ contact.label }}</a>
                      </span>
                      <span *ngSwitchCase="'email'">
                        <a [href]="'mailto:' + contact.value" class="text-decoration-none text-dark">{{ contact.value }}</a>
                      </span>
                      <span *ngSwitchDefault class="text-dark">{{ contact.value }}</span>
                    </ng-container>
                  </li>
                </ul>
                
                <!-- GitHub Trophy -->
                <div class="mt-4">
                  <img [src]="'https://github-profile-trophy.vercel.app/?username=' + profileData.githubUsername" 
                       alt="GitHub Trophies" class="img-fluid">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section Component -->
    <section id="experience" class="section-padding bg-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="section-title text-dark animate-fade-up">Work Experience</h2>
            <p class="lead text-secondary">Journey through leading organizations</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="timeline">
              <div class="timeline-item animate-fade-up" 
                   *ngFor="let experience of experienceData; let i = index">
                <div class="timeline-content">
                  <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h4 class="mb-1 text-dark">{{ experience.position }}</h4>
                      <h6 class="text-primary mb-2">{{ experience.company }}</h6>
                    </div>
                    <span [class]="'badge ' + experience.badgeClass">{{ experience.duration }}</span>
                  </div>
                  
                  <div *ngFor="let project of experience.projects">
                    <h6 class="text-info mb-2">{{ project.name }}</h6>
                    <ul class="list-unstyled">
                      <li *ngFor="let achievement of project.achievements" class="text-dark">
                        <i class="bi bi-check-circle text-success me-2"></i>{{ achievement }}
                      </li>
                    </ul>
                  </div>
                  
                  <div class="mt-3">
                    <span class="tech-badge" *ngFor="let tech of experience.technologies">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section Component -->
    <section id="skills" class="section-padding bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="section-title text-dark animate-fade-up">Technical Skills</h2>
            <p class="lead text-secondary">Expertise across modern web technologies</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-3 col-md-6" 
               *ngFor="let skill of skillsData; let i = index">
            <div class="skill-item animate-fade-up" [style.animation-delay]="(i * 100) + 'ms'">
              <div [class]="'skill-icon ' + skill.bgClass">{{ skill.icon }}</div>
              <h5 class="text-dark">{{ skill.name }}</h5>
              <p class="text-secondary small">{{ skill.description }}</p>
              <div class="skill-level">
                <div class="progress">
                  <div class="progress-bar" 
                       [style.width.%]="skill.level"
                       [class]="'bg-' + skill.color">
                  </div>
                </div>
                <small class="text-secondary">{{ skill.level }}% Proficiency</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section Component -->
    <section id="projects" class="section-padding bg-white">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="section-title text-dark animate-fade-up">Featured Projects</h2>
            <p class="lead text-secondary">Personal projects showcasing my expertise</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-6 col-md-6" 
               *ngFor="let project of projectsData; let i = index">
            <div class="card project-card animate-fade-up" [style.animation-delay]="(i * 200) + 'ms'">
              <div class="project-image" [style.background]="project.gradient">
                <i [class]="project.icon"></i>
              </div>
              <div class="card-body p-4">
                <h4 class="mb-3 text-dark">{{ project.name }}</h4>
                <p class="text-secondary mb-3">{{ project.description }}</p>
                <div class="mb-3">
                  <span class="tech-badge" *ngFor="let tech of project.technologies">{{ tech }}</span>
                </div>
                <div class="d-flex gap-2">
                  <a [href]="project.liveUrl" class="btn btn-primary btn-sm" target="_blank" *ngIf="project.liveUrl">
                    <i class="bi bi-eye me-1"></i>Live Demo
                  </a>
                  <a [href]="project.githubUrl" class="btn btn-outline-primary btn-sm" target="_blank">
                    <i class="bi bi-github me-1"></i>GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5">
          <a [href]="profileData.githubUrl" class="btn btn-outline-primary btn-lg" target="_blank">
            <i class="bi bi-github me-2"></i>View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- GitHub Stats Section -->
    <section class="section-padding bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="section-title text-dark animate-fade-up">GitHub Statistics</h2>
            <p class="lead text-secondary">My coding journey in numbers</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="card card-custom text-center animate-fade-up">
              <div class="card-body">
                <h5 class="text-dark">Top Languages</h5>
                <img [src]="'https://github-readme-stats.vercel.app/api/top-langs?username=' + profileData.githubUsername + '&show_icons=true&locale=en&layout=compact&theme=light'" 
                     alt="Top Languages" class="img-fluid">
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card card-custom text-center animate-fade-up">
              <div class="card-body">
                <h5 class="text-dark">GitHub Stats</h5>
                <img [src]="'https://github-readme-stats.vercel.app/api?username=' + profileData.githubUsername + '&show_icons=true&locale=en&theme=light'" 
                     alt="GitHub Stats" class="img-fluid">
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-12">
            <div class="card card-custom text-center animate-fade-up">
              <div class="card-body">
                <h5 class="text-dark">GitHub Streak</h5>
                <img [src]="'https://github-readme-streak-stats.herokuapp.com/?user=' + profileData.githubUsername + '&theme=light'" 
                     alt="GitHub Streak" class="img-fluid">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section Component -->
    <section id="contact" class="section-padding contact-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="section-title text-white animate-fade-up">Let's Work Together</h2>
            <p class="lead text-white">Ready to start your next project? Let's discuss how I can help.</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-3 col-md-6" 
               *ngFor="let contact of contactMethods; let i = index">
            <div class="contact-item animate-fade-up" [style.animation-delay]="(i * 100) + 'ms'">
              <div class="contact-icon">
                <i [class]="contact.icon"></i>
              </div>
              <h5 class="text-white">{{ contact.title }}</h5>
              <p class="mb-0" *ngIf="contact.type === 'link'">
                <a [href]="contact.url" class="text-white text-decoration-none" target="_blank">
                  {{ contact.value }}
                </a>
              </p>
              <p class="mb-0 text-white" *ngIf="contact.type === 'text'">{{ contact.value }}</p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5">
          <a [href]="'mailto:' + profileData.email" class="btn btn-light btn-lg btn-custom">
            <i class="bi bi-envelope me-2"></i>Send me an Email
          </a>
        </div>
      </div>
    </section>

    <!-- Footer Component -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <h5 class="mb-3 text-white">AK Dev Studio</h5>
            <p class="text-light mb-3">{{ footerData.description }}</p>
            <div class="d-flex gap-3">
              <a *ngFor="let social of socialLinks" 
                 [href]="social.url" class="text-light" target="_blank">
                <i [class]="social.icon + ' fs-4'"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-4">
            <h6 class="mb-3 text-white">Quick Links</h6>
            <ul class="list-unstyled">
              <li *ngFor="let link of quickLinks">
                <a [href]="link.url" class="text-light text-decoration-none" 
                   (click)="scrollToSection($event, link.url)">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </div>
        <hr class="my-4 bg-light">
        <div class="text-center">
          <p class="mb-0 text-light">{{ footerData.copyright }}</p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button class="btn btn-primary btn-scroll-top" 
            *ngIf="showScrollButton" 
            (click)="scrollToTop()">
      <i class="bi bi-arrow-up"></i>
    </button>
  `,
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit, OnDestroy {
  // Component State
  isMenuOpen = false;
  showScrollButton = false;
  private isBrowser = false;

  // Navigation Data
  navigationItems: NavigationItem[] = [
    { label: 'Home', link: '#home' },
    { label: 'About', link: '#about' },
    { label: 'Experience', link: '#experience' },
    { label: 'Skills', link: '#skills' },
    { label: 'Projects', link: '#projects' },
    { label: 'Contact', link: '#contact' }
  ];

  // Profile Data
  profileData: ProfileData = {
    greeting: 'Hi 👋, I\'m',
    name: 'Anish Kumar Srinivaasan',
    title: 'Senior Angular Application Developer',
    description: 'Crafting intuitive, high-performance web interfaces with expertise across Banking, Healthcare, and Telecom sectors. Specializing in Angular, TypeScript, and modern frontend technologies.',
    experience: 10,
    githubUsername: 'anishkumar92',
    githubUrl: 'https://github.com/anishkumar92',
    email: 'anishkumar@gmail.com'
  };

  // Profile Statistics
  profileStats: ProfileStat[] = [
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Projects' },
    { value: '15+', label: 'Technologies' }
  ];

  // About Section Data
  aboutData = {
    subtitle: 'Senior Frontend Developer with robust 10+ years career',
    professionalTitle: 'Professional Summary',
    description: 'Senior Frontend Developer with a robust 10+ years career spanning Banking, Healthcare, and Telecom sectors. My career is characterized by a deep-seated passion for Angular application development, marked by a strong commitment to crafting intuitive, high-performance web interfaces.'
  };

  // Current Projects & Learning
  currentProjects: string[] = [
    'Movie Picker - Angular movie recommendation app',
    'Admin Panel for Video Platform',
    'React learning projects'
  ];

  currentlyLearning: string[] = ['React', 'Node.js', 'GraphQL'];

  // Contact Information
  contactInfo: ContactInfo[] = [
    {
      icon: 'bi bi-geo-alt',
      type: 'text',
      label: 'Location',
      value: 'Chennai, Tamil Nadu, India'
    },
    {
      icon: 'bi bi-telephone',
      type: 'text',
      label: 'Phone',
      value: '+91 9566087098'
    },
    {
      icon: 'bi bi-envelope',
      type: 'email',
      label: 'Email',
      value: 'anishkumar@gmail.com'
    },
    {
      icon: 'bi bi-linkedin',
      type: 'link',
      label: 'linkedin.com/in/anish-srinivaasan',
      value: 'https://linkedin.com/in/anish-srinivaasan'
    }
  ];

  // Experience Data
  experienceData: Experience[] = [
    {
      position: 'Senior Frontend Developer - Angular',
      company: 'INFOMATICS, Chennai',
      duration: 'Dec 2023 - Current',
      badgeClass: 'bg-success',
      projects: [
        {
          name: 'IRIS Application (RCA Analysis Application)',
          achievements: [
            'Led End-to-End Development of RCA application using Angular 18',
            'Architected application upgrade from AngularJS to Angular 17',
            'Implemented custom UI components using Kendo UI',
            'Engineered multilevel stepper, form validation, and PDF export functionality'
          ]
        }
      ],
      technologies: ['Angular 18', 'TypeScript', 'Kendo UI', 'Azure DevOps']
    },
    {
      position: 'Senior Frontend Developer - Angular',
      company: 'LTI Mindtree, Chennai',
      duration: 'Mar 2021 - Dec 2023',
      badgeClass: 'bg-primary',
      projects: [
        {
          name: 'Teller Application for Absa Bank',
          achievements: [
            'Developed teller application for 1,000+ bank employees',
            'Achieved 98% defect resolution rate through optimization',
            'Implemented NGRX for state management',
            'Led Angular 4 to Angular 15 upgrade',
            '70% reduction in processing time for authentication modules'
          ]
        }
      ],
      technologies: ['Angular 15', 'NGRX', 'TypeScript', 'Digital Signature']
    },
    {
      position: 'Associate - Senior Frontend Developer',
      company: 'COGNIZANT, Chennai',
      duration: 'Apr 2019 - Feb 2021',
      badgeClass: 'bg-info',
      projects: [
        {
          name: 'Financial Auditing & Healthcare Applications',
          achievements: [
            'Developed audit application for UK audit firms',
            'Advanced proficiency in RxJS for async operations',
            '20% faster component communication using NGRX',
            '90% unit test coverage and 15% reduction in code defects'
          ]
        }
      ],
      technologies: ['Angular', 'RxJS', 'AWS S3', 'Responsive Design']
    },
    {
      position: 'Senior Engineer & Systems Engineer',
      company: 'Societe Generale & Infosys',
      duration: '2014 - 2019',
      badgeClass: 'bg-secondary',
      projects: [
        {
          name: 'Identity Management & Application Support',
          achievements: [
            'Identity and access management for Societe Generale Bank',
            '30% reduction in on-boarding time',
            'Monitored 50+ Java applications on Unix systems',
            '25% reduction in incident resolution times'
          ]
        }
      ],
      technologies: ['AngularJS', 'Java', 'Oracle', 'Unix']
    }
  ];

  // Skills Data
  skillsData: Skill[] = [
    {
      name: 'Angular',
      icon: 'A',
      bgClass: 'bg-danger',
      description: 'Version 2-18, Advanced patterns & architecture',
      level: 95,
      color: 'danger'
    },
    {
      name: 'TypeScript',
      icon: 'TS',
      bgClass: 'bg-primary',
      description: 'Type-safe development, Advanced features',
      level: 90,
      color: 'primary'
    },
    {
      name: 'JavaScript',
      icon: 'JS',
      bgClass: 'bg-warning',
      description: 'ES6+, Modern features, DOM manipulation',
      level: 88,
      color: 'warning'
    },
    {
      name: 'RxJS',
      icon: 'Rx',
      bgClass: 'bg-info',
      description: 'Reactive programming, Async operations',
      level: 85,
      color: 'info'
    },
    {
      name: 'NGRX',
      icon: 'NgRx',
      bgClass: 'bg-success',
      description: 'State management, Redux pattern',
      level: 80,
      color: 'success'
    },
    {
      name: 'CSS/SCSS',
      icon: 'CSS',
      bgClass: 'bg-primary',
      description: 'Responsive design, Flexbox, Grid',
      level: 85,
      color: 'primary'
    },
    {
      name: 'Node.js',
      icon: 'Node',
      bgClass: 'bg-success',
      description: 'Backend development, Express.js',
      level: 70,
      color: 'success'
    },
    {
      name: 'AWS',
      icon: 'AWS',
      bgClass: 'bg-warning',
      description: 'S3, EC2, Lambda, CloudFormation',
      level: 75,
      color: 'warning'
    }
  ];

  // Projects Data
  projectsData: Project[] = [
    {
      name: 'Movie Picker',
      description: 'Angular-based movie recommendation app with personalized suggestions, advanced filtering, and seamless user experience. Integrated with TMDB API for real-time movie data.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'TMDB API', 'Bootstrap'],
      liveUrl: 'https://movie-picker-chi.vercel.app/',
      githubUrl: 'https://github.com/anishkumar92/PickAMovie',
      icon: 'bi bi-film',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      name: 'NPS Calculator',
      description: 'Tool for calculating National Pension Scheme contributions and returns. Built with Angular featuring reactive forms and dynamic calculations with chart visualizations.',
      technologies: ['Angular', 'TypeScript', 'Reactive Forms', 'Chart.js'],
      liveUrl: 'https://nps-calculator.vercel.app/',
      githubUrl: 'https://github.com/anishkumar92/nps-calculator',
      icon: 'bi bi-calculator',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      name: 'Joke Teller BOT',
      description: 'Interactive Voice bot delivering jokes using JavaScript Speech API. Features text-to-speech functionality and random joke generation with engaging UI.',
      technologies: ['JavaScript', 'Speech API', 'Fetch API', 'HTML5'],
      liveUrl: 'https://anishkumar92.github.io/jokeTeller/',
      githubUrl: 'https://github.com/anishkumar92/jokeTeller',
      icon: 'bi bi-robot',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      name: 'Random Quote Generator',
      description: 'JavaScript application that generates and shares random inspirational quotes. Integrated with Twitter API for social media sharing capabilities.',
      technologies: ['JavaScript', 'Fetch API', 'Twitter API', 'CSS3'],
      liveUrl: 'https://anishkumar92.github.io/quote-generator/',
      githubUrl: 'https://github.com/anishkumar92/quote-generator',
      icon: 'bi bi-quote',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  // Contact Methods
  contactMethods: ContactMethod[] = [
    {
      icon: 'bi bi-envelope',
      title: 'Email',
      value: 'Send me an email',
      type: 'link',
      url: 'mailto:anishkumar@gmail.com'
    },
    {
      icon: 'bi bi-telephone',
      title: 'Phone',
      value: '+91 9566087098',
      type: 'text'
    },
    {
      icon: 'bi bi-linkedin',
      title: 'LinkedIn',
      value: 'Connect with me',
      type: 'link',
      url: 'https://linkedin.com/in/anish-srinivaasan'
    },
    {
      icon: 'bi bi-geo-alt',
      title: 'Location',
      value: 'Chennai, Tamil Nadu',
      type: 'text'
    }
  ];

  // Social Links
  socialLinks: SocialLink[] = [
    {
      icon: 'bi bi-github',
      url: 'https://github.com/anishkumar92'
    },
    {
      icon: 'bi bi-linkedin',
      url: 'https://linkedin.com/in/anish-srinivaasan'
    },
    {
      icon: 'bi bi-twitter',
      url: 'https://twitter.com/anishkumar92'
    },
    {
      icon: 'bi bi-envelope',
      url: 'mailto:anishkumar@gmail.com'
    }
  ];

  // Footer Data
  footerData = {
    description: 'Senior Angular Developer specializing in crafting high-performance web applications. Available for freelance projects and full-time opportunities.',
    copyright: '© 2025 AK Dev Studio. Built with ❤️ by Anish Kumar Srinivaasan using Angular & Bootstrap.'
  };

  // Quick Links
  quickLinks: QuickLink[] = [
    { label: 'About', url: '#about' },
    { label: 'Experience', url: '#experience' },
    { label: 'Skills', url: '#skills' },
    { label: 'Projects', url: '#projects' },
    { label: 'Contact', url: '#contact' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initializeScrollListener();
      this.initializeNavigation();
    }
  }

  ngOnDestroy(): void {
    // Cleanup any subscriptions if needed
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    
    this.showScrollButton = window.pageYOffset > 300;
    this.updateActiveNavigation();
    this.updateNavbarBackground();
  }

  /**
   * Toggle mobile navigation menu
   */
  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Scroll to specific section with smooth animation
   */
  scrollToSection(event: Event, target: string): void {
    event.preventDefault();
    
    if (!this.isBrowser) return;
    
    const element = document.querySelector(target);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.clientHeight || 70;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    this.isMenuOpen = false;
  }

  /**
   * Scroll to top of page
   */
  scrollToTop(): void {
    if (!this.isBrowser) return;
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Initialize scroll listener for animations - FIXED VERSION
   */
  private initializeScrollListener(): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    setTimeout(() => {
      const elementsToObserve = document.querySelectorAll('.fade-in, .animate-fade-up, .animate-fade-left, .animate-fade-right');
      elementsToObserve.forEach(el => observer.observe(el));
    }, 100);
  }

  /**
   * Initialize navigation functionality
   */
  private initializeNavigation(): void {
    if (!this.isBrowser) return;
    
    // Set initial active navigation item
    this.updateActiveNavigation();
  }

  /**
   * Update active navigation item based on scroll position
   */
  private updateActiveNavigation(): void {
    if (!this.isBrowser) return;
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Update navbar background on scroll
   */
  private updateNavbarBackground(): void {
    if (!this.isBrowser) return;
    
    const navbar = document.querySelector('.navbar-custom') as HTMLElement;
    if (navbar) {
      if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(13, 27, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(13, 27, 42, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
      }
    }
  }
}