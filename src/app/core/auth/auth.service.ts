import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router"
import { environment } from "src/environments/environment";

const BACKEND_URL = environment.apiUrl + "/user/"

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();
    private isAuth = false;
    private errorMessageListener = new Subject<string>();

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuth;
    }

    login(username: string, password: string) {
        const authData: AuthData = { username: username, password: password };
        this.http.post<{ token: string, expiresIn: number }>(BACKEND_URL + "login", authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuth = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(token, expirationDate)
                    this.router.navigate(['/dashboard']);
                }
            })
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuth = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuth = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        if(!token || !expirationDate) {
            return null;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate)
        }
    }

    handleErrorMessage(message: string) {
        this.errorMessageListener.next(message);
    }

    getErrorMessage() {
        return this.errorMessageListener.asObservable();
    }
}