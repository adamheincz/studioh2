import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Album } from '../album/album.model';
import { gsap } from 'gsap';
import { AlbumsService } from '../album/album.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChildren('carousel', { read: ElementRef }) carousels: QueryList<ElementRef>;
  @ViewChild('aboutUS', {static: false, read: ElementRef}) aboutUs: ElementRef;

  scrollTween: any;

  albums: Album[] = [];
  albumsSub: Subscription;
  dataIsLoaded = false;

  constructor(public albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.albumsService.getAlbums();
    this.albumsSub = this.albumsService.getAlbumsUpdatedListener()
      .subscribe((albums: Album[]) => {
        this.albums = albums;
        this.dataIsLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.albumsSub.unsubscribe();
  }
}
