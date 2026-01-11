import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { DashboardComponent } from './core/auth/dashboard/dashboard.component';
import { AlbumCreateComponent } from './core/album/album-create/album-create.component';
import { AuthGuard } from './core/auth/auth.guard';
import { PrefaceComponent } from './core/preface/preface.component';
import { GalleryComponent } from './core/gallery/gallery.component';
import { PricingComponent } from './core/pricing/pricing.component';
import { ContactComponent } from './core/contact/contact.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    children: [
      { path: 'rolunk', component: PrefaceComponent },
      { path: 'galeria', component: GalleryComponent },
      { path: 'arlista', component: PricingComponent},
      { path: 'elerhetoseg', component: ContactComponent}
    ]   
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-album', component: AlbumCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit-album/:albumId', component: AlbumCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
