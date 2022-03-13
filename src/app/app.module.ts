import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexModule } from './pages/index/index.module';
import { ComponentsModule } from './_components/components.module';
import { ToastrModule } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { CartService } from '@app_services/order/cart.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';
import { AuthInterceptor } from './_http/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    IndexModule,
    ToastrModule.forRoot({
      tapToDismiss: false,
      autoDismiss: true
    })
  ],
  providers: [
    LoadingService,
    MessengerService,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
