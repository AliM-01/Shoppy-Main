import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCategoryService } from '@app_services/shop/product-category/product-category.service';
import { ProductService } from '@app_services/shop/product/product.service';
import { SliderService } from '@app_services/shop/slider/slider.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexModule } from './pages/index/index.module';
import { ComponentsModule } from './_components/components.module';
import { ToastrModule } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { ProductCategoryModule } from '@apppages/product-category/product.category.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    IndexModule,
    ToastrModule.forRoot({
      tapToDismiss: false,
      autoDismiss: true
    }),
    ProductCategoryModule
  ],
  providers: [SliderService, ProductCategoryService, ProductService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
