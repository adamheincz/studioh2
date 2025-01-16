import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Album } from '../album/album.model';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  @Input({ required: true }) albums: Album[];
  @ViewChildren('carousel') carousels: QueryList<ElementRef>;
  @ViewChild('slidingTitle', { static: true }) slidingTitleRef: ElementRef;
  @ViewChild('options', { static: true }) optionsRef: ElementRef;
  @ViewChild('dropdownArrow', { static: true }) arrowRef: ElementRef;
  @ViewChild('title', { static: true }) title: ElementRef;

  dropdownTimeline = gsap.timeline();
  dropdownState = "closed";

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.dropdownTimeline.pause();
    if (isPlatformBrowser(this.platformId)) {
      console.log("browser")
      this.initAnimations();
      this.initScrollAnimations();
      ScrollTrigger.refresh();
    }
  }

  initScrollAnimations() {
    console.log("init_scroll");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.elRef.nativeElement,
        start: "top bottom-=64px",
        end: "top top+=64px",
        scrub: 1,
        // toggleActions: "play none none reset",
      }
    })

    tl.to(this.title.nativeElement, { translateX: "none" })

    for (let index = 0; index < this.carousels.toArray().length; index++) {
      let carousel = this.carousels.toArray()[index]
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: carousel.nativeElement,
          start: "top center",
          end: "center-=20% center",
          scrub: true,
          // markers: true
        }
      })

      tl.to(carousel.nativeElement, { opacity: 1, scale: 1, })
        .to(this.slidingTitleRef.nativeElement, { y: -20 * (index) }, 0)

    }

    for (let index = 0; index < this.carousels.toArray().length; index++) {
      let carousel = this.carousels.toArray()[index]
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: carousel.nativeElement,
          start: "center+=20% center",
          end: "bottom center",
          scrub: true,
        }
      })

      tl2.to(carousel.nativeElement, { opacity: 0.1 })
    }
  }

  initAnimations() {
    this.dropdownTimeline.to(this.optionsRef.nativeElement,
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        translateY: "none",
        duration: 0.2,
        ease: "power4.inOut"
      })
      .to(".arrow", {
        rotation: -180,
        duration: 0.2,
        ease: "power4.inOut"
      }, "<")
    // .to(".arrow", {
    //   scale: 1.8,
    //   duration: 0.1,
    //   ease: "power4.out"
    // }, "<")
    // .to(".arrow", {
    //   scale: 1,
    //   duration: 0.1,
    //   ease: "power4.in"
    // }, ">")
  }

  toggleDropDown() {
    if (this.dropdownState === "open") {
      this.onCloseDropdown();
    } else {
      this.onOpenDropdown();
    }
  }

  onOpenDropdown() {
    this.dropdownTimeline.play();
    this.dropdownState = "open";
  }

  onCloseDropdown() {
    this.dropdownTimeline.reverse();
    this.dropdownState = "closed";
  }

  scrollToSection(index: number) {
    this.carousels.get(index).nativeElement.scrollIntoView(
      {
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      }
    );
    this.onCloseDropdown();
  }
}
