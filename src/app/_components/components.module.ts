import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MobileHeaderComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true,
      primaryColour: '#57edbbe6',
      secondaryColour: '#17e9a3e5',
      tertiaryColour: '#57edbbe6'
    })
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MobileHeaderComponent,
    LoadingComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ComponentsModule { }
