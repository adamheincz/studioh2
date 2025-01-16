import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, AfterViewInit {

  @ViewChild('h2', { static: true }) h2: ElementRef;
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  images = ["/assets/hero_one.jpg", "/assets/hero_two.jpg"];
  loadedImages = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  loadImages() {
    for (let i = 0; i < this.images.length; i++) {
      let img = new Image();
      img.onload = () => {
        this.loaded();
      }
      img.src = this.images[i];
    }
  }

  loaded() {
    this.loadedImages++;
    if (this.images.length == this.loadedImages) {
      gsap.set(this.h2.nativeElement, { backgroundImage: `url(${this.images[0]})` });
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadImages();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  initScrollAnimations() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: "top top",
        end: "bottom center",
        scrub: true,
      }
    })

    tl.from(this.h2.nativeElement, { backgroundImage: `url(${this.images[0]})` })
      .to(this.h2.nativeElement, { backgroundImage: `url(${this.images[1]})` })
      .to(this.h2.nativeElement, { backgroundImage: `url(${this.images[0]})` })
      .to(this.h2.nativeElement, { backgroundImage: `url(${this.images[1]})` })
      .to(this.h2.nativeElement, { backgroundImage: `url(${this.images[0]})` })

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: "top+=25% top",
        end: "bottom center",
        scrub: true,
      }
    })

    tl2.to(this.h2.nativeElement, { webkitTextFillColor: "hsl(0 0% 100%)" })

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: this.wrapper.nativeElement,
        start: "top top",
        end: "bottom center",
        scrub: true,
      }
    })

    tl3.to(this.h2.nativeElement, { backgroundPositionY: "10px" })
  }

}
