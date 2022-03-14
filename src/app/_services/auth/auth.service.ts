import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { TokenStoreService } from "./token-store.service";
import { RefreshTokenService } from './refresh-token.service';
import { environment } from "@environments/environment";
import { AuthTokenType } from "@app_models/auth/auth-token-type";
import { ToastrService } from "ngx-toastr";
import { LoadingService } from "@app_services/_common/loading/loading.service";
import { LoginRequestModel, RegisterRequestModel, RevokeRefreshTokenRequestModel } from '../../_models/auth/_index';
import { IResponse } from "@app_models/_common/IResponse";
import { LoginResponseModel } from "@app_models/auth/login-response";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$: Observable<boolean> = this.isUserLoggedInSubject.asObservable();

  private authStatusSource = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSource.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
    private router: Router,
    private tokenStoreService: TokenStoreService,
    private refreshTokenService: RefreshTokenService
  ) {
    this.updateStatusOnPageRefresh();
    this.isUserLoggedInRequest()
      .subscribe(res => {
        if (res) {
          this.refreshTokenService.scheduleRefreshToken(true, false);
        }
      })
  }

  register(registerData: RegisterRequestModel): Observable<IResponse<any>> {

    this.loading.loadingOn();

    const formData = new FormData();
    formData.append('firstName', registerData.firstName);
    formData.append('lastName', registerData.lastName);
    formData.append('email', registerData.email);
    formData.append('password', registerData.password);
    formData.append('confirmPassword', registerData.confirmPassword);

    return this.http
      .post<IResponse<any>>(`${environment.authBaseApiUrl}/register`, formData)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();
          return throwError(error);
        })
      );
  }

  login(loginData: LoginRequestModel): Observable<boolean> {

    this.loading.loadingOn();

    const formData = new FormData();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);

    return this.http
      .post<IResponse<LoginResponseModel>>(`${environment.authBaseApiUrl}/login`, formData)
      .pipe(
        map((res) => {
          if (res.status === 'success') {

            this.loading.loadingOff();
            this.tokenStoreService.storeLoginSession(res.data);
            this.refreshTokenService.scheduleRefreshToken(true, true);
            this.authStatusSource.next(true);
            return true;
          }

          return false;
        }),
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.authStatusSource.next(false);
          this.toastr.error("عملیات با خطا مواجه شد", 'خطا', { timeOut: 2500 });

          this.loading.loadingOff();
          return throwError(error);
        })
      );
  }

  logout(navigateToHome: boolean): void {
    this.loading.loadingOn();

    const refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));

    const logoutData = new RevokeRefreshTokenRequestModel(refreshToken);

    this.http
      .post<IResponse<string>>(`${environment.authBaseApiUrl}/logout`, logoutData)
      .pipe(
        tap(() => this.loading.loadingOff()),
        catchError((error: HttpErrorResponse) => {

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return throwError(error);
        }),
        finalize(() => {
          this.tokenStoreService.deleteAuthTokens();
          this.refreshTokenService.unscheduleRefreshToken(true);
          this.authStatusSource.next(false);
          if (navigateToHome) {
            this.router.navigate(["/"]);
          }
        }))
      .subscribe(result => {
        console.log("logout", result);
      });
  }

  isUserLoggedInRequest(): Observable<boolean> {

    if (!this.tokenStoreService.hasStoredAccessAndRefreshTokens()) {
      return of(false)
    }


    return this.http
      .get<IResponse<string>>(`${environment.authBaseApiUrl}/is-authenticated`)
      .pipe(
        map(res => {
          if (res.status === 'success') {
            this.isUserLoggedInSubject.next(true);
            return true;
          } else {
            this.isUserLoggedInSubject.next(false);
            return false;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.isUserLoggedInSubject.next(false);

          this.toastr.error(error.error.message, 'خطا', { timeOut: 2500 });
          this.loading.loadingOff();

          return of(false);
        }));
  }

  private updateStatusOnPageRefresh(): void {
    this.isUserLoggedInRequest()
      .subscribe(res => this.authStatusSource.next(res))
  }
}
