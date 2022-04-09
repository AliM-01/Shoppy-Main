import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { UserProfileRoutingModule } from './user-profile.routing.module';
import { WelcomePage } from './welcome/welcome.page';

@NgModule({
  declarations: [
    WelcomePage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    UserProfileRoutingModule
  ],
  exports: [
  ],
  schemas: [],
  providers: []
})
export class UserProfileModule { }
