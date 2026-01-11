import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { DialogService } from './features/dialog.service';
import { filter, Subscription } from 'rxjs';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ScrollToPlugin } from 'gsap/all';
import { isPlatformBrowser } from '@angular/common';

// ScrollTrigger.config({
//   ignoreMobileResize: true
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  dialogOpened = false;
  private dialogSub: Subscription;
  data: { name?: string, type?: string };

  private fragment: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    public dialogService: DialogService) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const lenis = new Lenis();

      function raf(time: any) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(ScrollToPlugin);
      this.authService.autoAuthUser();
    }
    this.dialogSub = this.dialogService.getDialogOpenedListener()
      .subscribe((dialogOpened: boolean) => {
        console.log("dialog opened");
        this.dialogOpened = dialogOpened;
      });
  }

  ngOnDestroy(): void {
    this.dialogSub.unsubscribe();
  }
}
