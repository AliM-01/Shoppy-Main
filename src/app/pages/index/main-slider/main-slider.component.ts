import { Component, OnInit } from '@angular/core';
import { SliderModel } from '@app_models/slider/slider';
import { SliderService } from '@app_services/slider/slider.service';
import { environment } from '@environments/environment';
@Component({
  selector: 'index-main-slider',
  templateUrl: './main-slider.component.html'
})
export class MainSliderComponent implements OnInit {

  isDataLoaded: boolean = false;
  sliders: SliderModel[] = [];
  baseSliderPath: string = environment.sliderBaseImagePath;
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true,
     "fade": true, "loop": true, "arrows": true};

  constructor(
    private sliderService: SliderService
  ) { }

  ngOnInit(): void {

    this.sliderService.getSlidersList().subscribe(res => {
      if(res.status ==="success"){
        this.sliders = res.data;
        console.log(this.sliders);
        
        this.isDataLoaded = true;
      }
    })
  }
}
