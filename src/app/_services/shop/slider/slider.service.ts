import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '@app_models/common/IResponse';
import { SliderModel } from '@app_models/shop/slider/slider';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  constructor(
    private http: HttpClient
  ) { }

  getSlidersList(): Observable<IResponse<SliderModel[]>> {
    return this.http.get<IResponse<SliderModel[]>>(`${environment.shopBaseApiUrl}/slider/get-list`);
  }
}