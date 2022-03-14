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
import { LoginPage } from './login/login.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterPage } from './register/register.page';

@NgModule({
  declarations: [
    RegisterPage,
    LoginPage
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    AuthRoutingModule,
    CommentModule
  ],
  exports: [
    RegisterPage,
    LoginPage
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
