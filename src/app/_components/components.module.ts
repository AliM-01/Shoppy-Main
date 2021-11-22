import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  schemas: []
})
export class ComponentsModule { }
