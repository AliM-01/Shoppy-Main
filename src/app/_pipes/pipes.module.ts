import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThousandSeparatorPipe as ThousandSeparatorPipe } from './thousand-separator/thousand-separator';

@NgModule({
  declarations: [
    ThousandSeparatorPipe
  ],
  imports: [CommonModule],
  exports: [
    ThousandSeparatorPipe
  ],
  schemas: []
})
export class PipesModule { }
