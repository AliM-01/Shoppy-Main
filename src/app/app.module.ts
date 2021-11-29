import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexModule } from './pages/index/index.module';
import { ComponentsModule } from './_components/components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    IndexModule
  ],
  providers: [SliderService, ProductCategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
