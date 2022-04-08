import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app_services/auth/auth.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html'
})
export class HeaderAuthComponent implements OnInit {

  isChecked: boolean = false;
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
      this.isChecked = true;
    })
  }

  navigateTo(path: string) {
    this.router.navigate([path], { queryParams: { returnUrl: this.router.url } });
  }
}
