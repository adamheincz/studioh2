import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/features/dialog.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit, OnDestroy {

  @ViewChild('description', { static: false }) description: ElementRef;
  @ViewChild('imageFirst', { static: false }) imageFirst: ElementRef;
  @ViewChild('imageSecond', { static: false }) imageSecond: ElementRef;

  private dialogSub: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elRef: ElementRef,
    private dialogService: DialogService) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  initScrollAnimations() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.elRef.nativeElement,
        start: "top+=35% bottom-=64px",
        end: "top+=35% top+=64px",
        scrub: 0.1,
      }
    })

    tl.to(this.elRef.nativeElement, { translateY: "none" })
    // .to(".image-second", {opacity: 1, translateY: "none", duration: 0.5}, 0)
    // .to(".image-first", {opacity: 1, translateY: "none", duration: 0.25}, ">-0.25")
    // .to(".description", {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power4.out", duration: 1})

    // const tl2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: this.elRef.nativeElement,
    //     start: "top+=25% bottom-=64px",
    //     // toggleActions: "play none none reset",
    //   }
    // })

    // tl2.to(this.description.nativeElement, {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "power4.out", duration: 1, delay: 0.25})
    // .to(this.imageSecond.nativeElement, {opacity: 1, translateY: "none", duration: 0.5}, 0.25)
    // .to(this.imageFirst.nativeElement, {opacity: 1, translateY: "none", duration: 0.25}, ">-0.25")

  }

  openInformationDialog(src: string) {
    this.dialogSub = this.dialogService.open({
      dialogType: 'information',
      src: src,
    }).subscribe(() => {
      console.log("information");
    })
  }

  ngOnDestroy(): void {
    if(this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }
}
