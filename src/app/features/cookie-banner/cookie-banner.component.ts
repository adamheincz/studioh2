import { Component, OnInit } from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {

  storedCookieConsent: string = null;
  hide: boolean = false;

  ngOnInit(): void {
    this.storedCookieConsent = localStorage.getItem("cookie_consent");
    console.log(this.storedCookieConsent);
  }

  onClick(value: string) {
    this.setGtag(value);
    localStorage.setItem("cookie_consent", value);
    this.hide = true;
  }

  setGtag(value: string) {
    gtag("consent", 'update', {
      'analytics_storage': value
    });
  }
}
