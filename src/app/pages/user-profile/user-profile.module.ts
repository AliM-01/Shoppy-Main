import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { CommentModule } from '../comment/comment.module';
import { UserProfileRoutingModule } from './user-profile.routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    UserProfileRoutingModule,
    CommentModule
  ],
  exports: [
  ],
  schemas: [],
  providers: []
})
export class UserProfileModule { }
