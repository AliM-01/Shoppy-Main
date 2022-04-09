import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { HomeLayout } from './home/home.layout';

@NgModule({
  declarations: [
    HomeLayout
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
  ],
  exports: [
    HomeLayout
  ],
  schemas: [],
  providers: []
})
export class LayoutsModule { }
