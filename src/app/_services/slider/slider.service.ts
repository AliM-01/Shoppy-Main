import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/_models/common/IResponse';
import { SliderModel } from 'src/app/_models/slider/slider';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  constructor(
    private http: HttpClient
  ) { }

  getSlidersList(): Observable<IResponse<SliderModel[]>> {
    return this.http.get<IResponse<SliderModel[]>>(`${environment.apiUrl}/slider/get-list`);
  }
}