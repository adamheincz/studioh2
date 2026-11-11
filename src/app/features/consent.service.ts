import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {
  bannerOpen = false;

  constructor() { 
  }

  openBanner() {
    this.bannerOpen = true;
  }

  closeBanner() {
    this.bannerOpen = false;
    console.log(this.bannerOpen);
  }
}
