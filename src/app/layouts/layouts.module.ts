import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexModule } from '@apppages/index/index.module';
import { NotFoundPage } from '@apppages/not-found/not-found.page';
import { ComponentsModule } from '@app_components/components.module';
import { HomeLayout } from './home/home.layout';
import { LayoutsRoutingModule } from './layouts.routing.module';
import { UserDashboardLayout } from './user-dashboard/user-dashboard.layout';

@NgModule({
  declarations: [
    HomeLayout,
    UserDashboardLayout,
    NotFoundPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    LayoutsRoutingModule,
    IndexModule,
  ],
  exports: [
    HomeLayout,
    UserDashboardLayout,
    NotFoundPage
  ],
  schemas: [],
  providers: []
})
export class LayoutsModule { }
