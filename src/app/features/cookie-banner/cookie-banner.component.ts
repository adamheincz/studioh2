import { Component, OnInit } from '@angular/core';
import { ConsentService } from '../consent.service';

declare let gtag: Function;

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {

  storedCookieConsent: string = null;

  constructor(public consent: ConsentService){}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.storedCookieConsent = localStorage.getItem("cookie_consent");
    console.log(this.storedCookieConsent);
    }
  }

  onClick(value: string) {
    this.setGtag(value);
    if (value === 'denied') {
      this.deleteAnalyticsCookies();
    }
    localStorage.setItem("cookie_consent", value);
    this.consent.closeBanner();
  }

  setGtag(value: string) {
    gtag("consent", 'update', {
      'analytics_storage': value
    });
  }

  private deleteAnalyticsCookies() {
  const host = location.hostname;
  const parts = host.split('.');

  const domains = [host];
  for (let i = 0; i < parts.length - 1; i++) {
    domains.push('.' + parts.slice(i).join('.'));
  }

  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';

  document.cookie.split(';').forEach(c => {
    const name = c.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')) {
      document.cookie = `${name}=; ${expired}; path=/`;
      domains.forEach(d => {
        document.cookie = `${name}=; ${expired}; path=/; domain=${d}`;
      });
    }
  });
}
}
