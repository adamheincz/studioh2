import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Photo } from '../../album/photo.model';
import { Album } from '../../album/album.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { gsap } from 'gsap';
import { RoutescrollerService } from 'src/app/routescroller.service';

@Component({
  selector: 'app-album-carousel',
  templateUrl: './album-carousel.component.html',
  styleUrls: ['./album-carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlbumCarouselComponent implements AfterViewInit{
  photos: Photo[] = [];
  @Input({required: true}) album: Album;
  selectedPhotoIndex = 0;
  imagesLoadedArray: boolean[] = [];

  @ViewChild('carouselTrigger', { static: true }) carouselTrigger: ElementRef<HTMLDivElement>;
  @ViewChild('slickCarousel',  { static: true }) slickCarousel: SlickCarouselComponent;
  @ViewChildren('photoTitle') photoTitles: QueryList<ElementRef>;
  @ViewChildren('skeletonImage') skeletonImages: QueryList<ElementRef>;

  constructor() { }

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "variableWidth": true,
    "variableHeight": true,
    "centerMode": true,
    "infinite": true,
    "centerPadding": 0,
    "lazyLoading": true
  }

  ngAfterViewInit(): void {
    this.imagesLoadedArray = new Array(this.album.photos.length).fill(false);
  }

  beforeChange(e: any) {
    this.selectedPhotoIndex = e.currentSlide + 1;
  }

  afterChange(e: any) {
    console.log(e);
  }

  onLoad(index: number) {
    // ScrollTrigger.refresh();
    this.imagesLoadedArray[index] = true;
    if(index == 0) {
      this.slickCarousel.slickGoTo(0);
    }
  }

}
