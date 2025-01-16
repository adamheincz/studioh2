import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { gsap } from 'gsap';


@Component({
  selector: 'app-preface',
  templateUrl: './preface.component.html',
  styleUrls: ['./preface.component.css']
})
export class PrefaceComponent implements AfterViewInit{

  @ViewChild('quote', {static: true}) quote: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object ){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  initScrollAnimations() {
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: this.quote.nativeElement,
           start: "top-=30% center",
           end: "center center",
           scrub: 2,
         }
       })

       tl.to(this.quote.nativeElement, {backgroundSize: "100% 100%"})

    }
  
}
