import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../core/auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An error occured!';

                if (error.error.message) {
                    errorMessage = error.error.message
                }
                this.authService.handleErrorMessage(errorMessage);
                return throwError(() => error);
            })
        );
    }
}