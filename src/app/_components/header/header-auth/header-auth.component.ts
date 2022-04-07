import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app_services/auth/auth.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';

@Component({
  selector: 'app-header-auth',
  template: `
    <div class="header-action">
        <div *ngIf="!isLoggedIn" class="d-flex">
          <a (click)="navigateTo('/auth/login')" class="h6">
              ورود به حساب
            <i class="las la-user"></i>
          </a>
          <a (click)="navigateTo('/auth/register')" class="h6 ml-3">
            / ثبت نام
            <i class="las la-user"></i>
          </a>
        </div>

        <div *ngIf="isLoggedIn" class="d-flex">
          <a routerLink="/user-profile" class="h6">
              <i class="la la-user"></i>
          </a>
          <a (click)="authService.logout(true)" class="h6">
            خروج
          </a>
        </div>
    </div>
  `
})
export class HeaderAuthComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    public authService: AuthService,
    public msg: MessengerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkAuth();
    this.handleAuthChanges();
  }

  handleAuthChanges() {
    this.msg.getMsg().subscribe((event: any) => {
      this.checkAuth();
    })
  }

  checkAuth() {
    this.authService.isUserLoggedInRequest().subscribe(res => {
      this.isLoggedIn = res;
    })
  }

  navigateTo(path: string) {
    this.router.navigate([path], { queryParams: { returnUrl: this.router.url } });
  }
}
