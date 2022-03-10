import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'any',
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) {
  }

}
