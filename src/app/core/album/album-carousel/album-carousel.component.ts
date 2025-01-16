import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Photo } from '../../album/photo.model';
import { Album } from '../../album/album.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { gsap } from 'gsap';

@Component({
  selector: 'app-album-carousel',
  templateUrl: './album-carousel.component.html',
  styleUrls: ['./album-carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlbumCarouselComponent implements AfterViewInit, OnInit{
  photos: Photo[] = [];
  @Input({required: true}) album: Album;
  selectedPhotoIndex = 0;
  counter = 0;

  @ViewChild('carouselTrigger', { static: true }) carouselTrigger: ElementRef<HTMLDivElement>;
  @ViewChild('slickCarousel',  { static: true }) slickCarousel: SlickCarouselComponent;
  @ViewChildren('photo') photoRefs: QueryList<ElementRef>;
  @ViewChildren('photoTitle') photoTitles: QueryList<ElementRef>;

  constructor() { }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "variableWidth": true,
    "variableHeight": true,
    "centerMode": true,
    "infinite": true,
    "centerPadding": 0,
    "lazyLoading": true
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //this.animatePhotos();
    //this.animateTitles();
  }

  isLazyLoaded(index: number){
    if(index > 1 || index < -1) {
      return "lazy";
    }
    return "eager";
  }

  beforeChange(e: any) {
    this.selectedPhotoIndex = e.currentSlide + 1;
  }

  afterChange(e: any) {
    console.log(e);
  }

  fixCentering(index: number) {
    // ScrollTrigger.refresh();
    if(index == 0) {
      this.slickCarousel.slickGoTo(0);
    }
    this.counter++;
  }

}
