import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { HomeLayout } from './home/home.layout';
import { UserDashboardLayout } from './user-dashboard/user-dashboard.layout';

@NgModule({
  declarations: [
    HomeLayout,
    UserDashboardLayout
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
  ],
  exports: [
    HomeLayout,
    UserDashboardLayout
  ],
  schemas: [],
  providers: []
})
export class LayoutsModule { }
