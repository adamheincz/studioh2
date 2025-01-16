import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { gsap } from 'gsap';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  timeline = gsap.timeline();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public authService: AuthService,
    private viewportScroller: ViewportScroller,
    private router: Router) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }


  ngAfterViewInit(): void {
    this.timeline.pause();
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  onReroute(section?: string) {
    this.router.navigate(['']).then(() => {
      if (section) {
        this.jumpToSection(section)
      }
    });
    this.timeline.reverse();
  }

  onLogout() {
    this.authService.logout();
  }

  onOpenMenu() {
    this.timeline.play();
  }

  onClick() {
    this.timeline.reverse();
  }

  initAnimations() {
    this.timeline.to(".menu-container",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        translateY: "none",
        duration: 0.6,
        ease: "power4.inOut"
      })
  }

  jumpToSection(section: string | null) {
    if (typeof window !== "undefined") {
      if (section) {
        gsap.to(window, { duration: 1, scrollTo: { y: `#${section}`, offsetY: 64 } });
      } else {
        gsap.to(window, { scrollTo: { y: 0, offsetY: 64 } });
      }
    }
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
