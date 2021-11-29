import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '@app/_models/common/IResponse';
import { SliderModel } from '@app/_models/slider/slider';
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