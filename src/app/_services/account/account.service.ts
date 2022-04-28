import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserProfileModel } from "@app_models/account/_index";
import { LoadingService } from "@app_services/_common/loading/loading.service";
import { environment } from "@environments/environment";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) { }

  getProfile(): Observable<UserProfileModel> {
    this.loading.loadingOn();

    return this.http.get<UserProfileModel>
      (`${environment.userBaseApiUrl}/profile`)
      .pipe(
        finalize(() => this.loading.loadingOff())
      );
  }
}
