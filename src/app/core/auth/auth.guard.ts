import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);

    const isAuth = authService.getIsAuth();
    if (!isAuth) {
        router.navigate(['/']);
    }
    return isAuth;
}