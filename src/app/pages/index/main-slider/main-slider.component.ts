import { Component, OnInit } from '@angular/core';
import { SliderModel } from '@app_models/shop/slider/slider';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'index-main-slider',
  templateUrl: './main-slider.component.html'
})
export class MainSliderComponent implements OnInit {

  slidersSubject: BehaviorSubject<SliderModel[]> = new BehaviorSubject<SliderModel[]>([]);
  sliders$: Observable<SliderModel[]> = this.slidersSubject.asObservable();

  baseSliderPath: string = environment.sliderBaseImagePath;
  slideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1, "dots": true,
    "fade": true, "loop": true, "arrows": true
  };

  constructor(
    private sliderService: SliderService
  ) { }

  ngOnInit(): void {

    this.sliderService.getSlidersList().subscribe(res => this.slidersSubject.next(res))
  }
}
