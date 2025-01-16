import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { gsap } from 'gsap';
import { Pricing } from '../price-card/pricing.model';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements AfterViewInit {

  @ViewChild('title', { static: false }) title: ElementRef;
  @ViewChildren('priceCard', {read: ElementRef}) priceCards: QueryList<ElementRef>;

  prices:Pricing[] = [
    {
      "title": "Portré fotózás",
      "description": "Kültéri vagy beltéri portré fotózás egy személy részére.",
      "imageUrl": "/assets/portre.jpg",
      "packages": [
        {
          "title": "Silver",
          "price": 39000,
          "details": [
            "60 perc fotózás",
            "30 db szerkesztett kép",
            "5 db retusált kép",
            "3 szett ruha"
          ]
        },
        {
          "title": "Gold",
          "price": 59000,
          "details": [
            "2 óra fotózás",
            "60 db szerkesztett kép",
            "12 db retusált kép",
            "8 szett ruha"
          ]
        },
        {
          "title": "Diamond",
          "price": 79000,
          "details": [
            "3 óra fotózás",
            "90 db szerkesztett kép",
            "20 db retusált kép",
            "korlátlan szett ruha"
          ]
        }
      ],
    },
    {
      "title": "Páros fotózás",
      "description": "Kültéri vagy beltéri portré fotózás két személy részére.",
      "imageUrl": "/assets/paros.jpg",
      "packages": [
        {
          "title": "Silver",
          "price": 49000,
          "details": [
            "60 perc fotózás",
            "30 db szerkesztett kép",
            "5 db retusált kép",
            "3 szett ruha"
          ]
        },
        {
          "title": "Gold",
          "price": 69000,
          "details": [
            "2 óra fotózás",
            "60 db szerkesztett kép",
            "12 db retusált kép",
            "8 szett ruha"
          ]
        },
        {
          "title": "Diamond",
          "price": 89000,
          "details": [
            "3 óra fotózás",
            "90 db szerkesztett kép",
            "20 db retusált kép",
            "korlátlan szett ruha"
          ]
        }
      ],
    },
    {
      "title": "Családi fotózás",
     "description": "Kültéri vagy beltéri fotózás család részére.",
     "imageUrl": "/assets/csalad.jpg",
      "packages": [
        {
          "title": "Silver",
          "price": 49000,
          "details": [
            "60 perc fotózás",
            "30 db szerkesztett kép",
            "3 db retusált kép",
          ]
        },
        {
          "title": "Gold",
          "price": 69000,
          "details": [
            "2 óra fotózás",
            "60 db szerkesztett kép",
            "8 db retusált kép",
          ]
        },
        {
          "title": "Diamond",
          "price": 89000,
          "details": [
            "3 óra fotózás",
            "90 db szerkesztett kép",
            "12 db retusált kép",
          ]
        }
      ],
    },
    {
      "title": "Esküvő fotózás",
      "description": "",
      "imageUrl": "/assets/wedding_placeholder.jpg",
      "packages": [
        {
          "title": "Silver",
          "price": 149000,
          "details": [
            "polgári és egyházi esküvő fotózása",
            "csoportkép",
            "+2 órás kreatív fotózás",
          ]
        },
        {
          "title": "Gold",
          "price": 259000,
          "details": [
            "polgári és egyházi esküvő fotózása",
            "csoportkép, dekoráció, helyszín, pillanatképek",
            "rendelkezésre állás a vacsoráig",
            "+2 órás kreatív fotózás"
          ]
        },
        {
          "title": "Diamond",
          "price": 389000,
          "details": [
            "polgári és egyházi esküvő fotózása",
            "csoportkép, előkészületek, dekoráció, helyszín,  pillanatképek",
            "rendelkezésre állás menyecsketáncig",
            "+3 órás kreatív fotózás (javasolt külön napon)"
          ]
        }
      ],
    },
    {
      "title": "Kisállat fotózás",
      "description": "Kutya, macska, ló vagy egyéb háziállat fotózása",
      "imageUrl": "/assets/kisallat.jpg",
      "packages": [
        {
          "title": "Silver",
          "price": 29000,
          "details": [
            "30 perc fotózás stúdióban vagy kültéren",
            "3 db retusált",
            "10 db szerkesztett kép",
          ]
        },
        {
          "title": "Gold",
          "price": 49000,
          "details": [
            "1 óra fotózás stúdióban és/ vagy kültéren akár tevékenység közben",
            "6 db retusált kép",
            "20 db szerkesztett kép",
          ]
        },
        {
          "title": "Diamond",
          "price": 69000,
          "details": [
            "2 óra fotózás stúdióban és/ vagy kültéren akár tevékenység közben",
            "9 db retusált kép",
            "30 db szerkesztett kép",
          ]
        }
      ],
    },
    {
      "title": "Gyermek fotózás",
      "description": "1-12 éves gyermek fotózása",
      "imageUrl": "/assets/gyerek.jpg",
      "packages": [
        {
          "title": "Silver",
          "price": 29000,
          "details": [
            "30 perc fotózás beltérben vagy kültéren",
            "3 db retusált kép",
            "10 db szerkesztett kép",
          ]
        },
        {
          "title": "Gold",
          "price": 49000,
          "details": [
            "1 óra fotózás beltérben vagy kültéren",
            "6 db retusált kép",
            "20 db szerkesztett kép"
          ]
        },
        {
          "title": "Diamond",
          "price": 69000,
          "details": [
            "1.5-2 óra fotózás beltérben és/ vagy kültéren",
            "9 db retusált kép",
            "30 db szerkesztett kép"
          ]
        }
      ],
    },
    {
      "title": "Rendezvény fotózás",
      "description": "Családi, közösségi, munkahelyi rendezvények, sportesemények, művészeti rendezvények fotózása ( pl. ballagás, keresztelő, konferencia, autóverseny, rock koncert, kiállítás megnyitó)",
      "imageUrl": "/assets/rendezveny.jpg",
      "packages": [
        {
          "title": "Silver",
          "price": 39000,
          "details": [
            "1 órás rendelkezésre állás",
            "20 db szerkesztett kép"
          ]
        },
        {
          "title": "Gold",
          "price": 59000,
          "details": [
            "2 órás rendelkezésre állás",
            "40 db szerkesztett kép"
          ]
        },
        {
          "title": "Diamond",
          "price": 89000,
          "details": [
            "min. 3 órás rendelkezésre állás",
            "szerkesztett és esetleg retusált képek száma megbeszélés, idő faktor és a rendezvény típusa szerint"
          ]
        }
      ],
    },
    {
      "title": "Épület, tárgy, étel fotózás",
      "description": "",
      "imageUrl": "/assets/epulet.jpg",
      "packages": [
        {
          "title": "Silver",
          "price": 29000,
          "details": [
            "5 db fotó professzionálisan szerkesztve, korrigálva",
            "a képek igény szerint online és/vagy nyomtatott megjelenítéshez optimalizálva"
          ]
        },
        {
          "title": "Gold",
          "price": 59000,
          "details": [
            "12 db fotó professzionálisan szerkesztve, korrigálva",
            "a képek igény szerint online és/vagy nyomtatott megjelenítéshez optimalizálva",
          ]
        },
        {
          "title": "Diamond",
          "price": 89000,
          "details": [
            "minimum 20 fotó professzionálisan szerkesztve, korrigálva",
            "a képek igény szerint online és/vagy nyomtatott megjelenítéshez optimalizálva"
          ]
        }
      ],
    },

  ]

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  initScrollAnimations() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.elRef.nativeElement,
        start: "top bottom-=64px",
        end: "top top+=64px",
        scrub: 1,
      }
    })

    tl.to(this.title.nativeElement, { translateX: "none" })

    for (let index = 0; index < this.priceCards.toArray().length; index++) {
      let priceCard = this.priceCards.toArray()[index]
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: priceCard.nativeElement,
          start: "top bottom-=64px",
        }
      })

      tl.to(priceCard.nativeElement, { opacity: 1, translateY: "none" })

    }

  }
}
