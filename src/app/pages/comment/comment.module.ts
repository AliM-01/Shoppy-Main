import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  schemas: []
})
export class CommentModule { }
