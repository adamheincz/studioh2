import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { gsap } from 'gsap/gsap-core';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutescrollerService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  // initRouteScroller() {
  //   this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
  //     this.jumpToSection();
  //   })
  // }

  sections: string[] = ['rolunk', 'galeria', 'arlista', 'elerhetoseg'];

  jumpToSection(section = this.router.parseUrl(this.router.url).root.children['primary']?.segments[0]?.path) {

    if (isPlatformBrowser(this.platformId)) {
      if (section && this.sections.includes(section)) {
        if (section == "elerhetoseg") {
          gsap.to(window, { duration: 1, ease: "power2.out", scrollTo: { y: "max" } });
        } else {
          gsap.to(window, { duration: 1, ease: "power2.out", scrollTo: { y: `#${section}`, offsetY: 64 } });
        }
      } else {
        gsap.to(window, { duration: 1, ease: "power2.out", scrollTo: { y: 0, offsetY: 64 } });
      }
    }
  }
}
