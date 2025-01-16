import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { DashboardComponent } from './core/auth/dashboard/dashboard.component';
import { AlbumCreateComponent } from './core/album/album-create/album-create.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
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
