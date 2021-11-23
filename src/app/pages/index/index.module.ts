import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';
import { MainSliderComponent } from './main-slider/main-slider.component';

@NgModule({
  declarations: [
    IndexComponent,
    MainSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    IndexComponent,
    MainSliderComponent
  ],
  schemas: []
})
export class IndexModule { }
