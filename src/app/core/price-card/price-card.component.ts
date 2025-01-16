import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Pricing } from './pricing.model';
import { gsap } from 'gsap';
import { Package } from './package.model';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.css']
})
export class PriceCardComponent implements OnInit{
  
  @Input({required: true}) pricing: Pricing;
  @ViewChild('priceCard', { static: false}) priceCard: ElementRef;
  @ViewChild('price', { static: false}) priceRef: ElementRef;
  @ViewChild('content', { static: false}) contentRef: ElementRef;
  @ViewChild('details', { static: false}) detailsRef: ElementRef;

  selectedIndex = 0;
  displayedPackage: Package;

  changeTimeline = gsap.timeline();

  constructor(){}

  ngOnInit(){
    this.displayedPackage = this.pricing.packages[this.selectedIndex];
  }

  onChange(e: Event) { 
    this.changeTimeline.clear();
    this.changeTimeline.to(this.priceRef.nativeElement, { opacity: 0, duration: 0, translateY: "1rem"})
    .to(this.detailsRef.nativeElement, { opacity: 0, duration: 0,}, 0)
    .to(this.priceRef.nativeElement, { opacity: 1, duration: 0.5, translateY: 0, ease: 'power3.out'})
    .to(this.detailsRef.nativeElement, { opacity: 1, duration: 1}, "<");
  }

}
