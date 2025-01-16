import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { DashboardComponent } from './core/auth/dashboard/dashboard.component';
import { AlbumCreateComponent } from './core/album/album-create/album-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthInterceptor } from './core/auth/auth-interceptor';
import { ErrorInterceptor } from './features/error-interceptor';
import { AlbumCarouselComponent } from './core/album/album-carousel/album-carousel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './features/confirmation-dialog/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ContactComponent } from './core/contact/contact.component';
import { PrefaceComponent } from './core/preface/preface.component';
import { HeroComponent } from './core/hero/hero.component';
import { NgOptimizedImage } from '@angular/common';
import { GalleryComponent } from './core/gallery/gallery.component';
import { PricingComponent } from './core/pricing/pricing.component';
import { PriceCardComponent } from './core/price-card/price-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu'

registerLocaleData(localeHu);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    AlbumCreateComponent,
    AlbumCarouselComponent,
    ConfirmationDialogComponent,
    ContactComponent,
    PrefaceComponent,
    HeroComponent,
    GalleryComponent,
    PricingComponent,
    PriceCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatIconModule,
    NgOptimizedImage,
    FormsModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'hu-HU'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
