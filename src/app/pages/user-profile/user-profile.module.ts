import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { CommentModule } from '../comment/comment.module';
import { SamplePage } from './sample/sample.page';
import { SidebarComponent } from './side-bar/sidebar.component';
import { UserProfileRoutingModule } from './user-profile.routing.module';

@NgModule({
  declarations: [
    SidebarComponent,
    SamplePage
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
