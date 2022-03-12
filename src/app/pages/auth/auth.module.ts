import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { AuthService } from '@app_services/auth/auth.service';
import { BrowserStorageService } from '@app_services/auth/browser-storage.service';
import { RefreshTokenService } from '@app_services/auth/refresh-token.service';
import { TokenStoreService } from '@app_services/auth/token-store.service';
import { CommentModule } from '../comment/comment.module';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    AuthRoutingModule,
    CommentModule
  ],
  exports: [
  ],
  schemas: [],
  providers: [
    AuthService,
    TokenStoreService,
    RefreshTokenService,
    BrowserStorageService
]
})
export class AuthModule { }
