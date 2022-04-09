import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { ProductBoxComponent } from './product-box/product-box.component';
import { NgSelect2Module } from 'ng-select2';
import { PipesModule } from '@app_pipes/pipes.module';
import { HeaderCartComponent } from './header/header-cart/header-cart.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderAuthComponent } from './header/header-auth/header-auth.component';
import {ArticleBoxComponent } from './article-box/article-box.component';
import { UserDashboardSidebarComponent } from './user-dashboard-sidebar/user-dashboard-sidebar.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    MobileHeaderComponent,
    HeaderCartComponent,
    HeaderAuthComponent,
    LoadingComponent,
    ProductBoxComponent,
    ArticleBoxComponent,
    UserDashboardSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true,
      primaryColour: '#57edbbe6',
      secondaryColour: '#17e9a3e5',
      tertiaryColour: '#57edbbe6',
      backdropBackgroundColour: '#fff'
    }),
    NgSelect2Module,
    PipesModule
  ],
  exports: [
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    MobileHeaderComponent,
    LoadingComponent,
    ProductBoxComponent,
    ArticleBoxComponent,
    UserDashboardSidebarComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ComponentsModule { }
