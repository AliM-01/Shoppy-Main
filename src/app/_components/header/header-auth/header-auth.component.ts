import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app_services/auth/auth.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';
import { Observable, BehaviorSubject } from 'rxjs';

export enum AuhLoadingState {
  Pending,
  UnAuthorized,
  LoggedIn
}

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html'
})
export class HeaderAuthComponent implements OnInit {

  private authStateSubject: BehaviorSubject<AuhLoadingState> =
    new BehaviorSubject<AuhLoadingState>(AuhLoadingState.Pending);
  authState$: Observable<AuhLoadingState> = this.authStateSubject.asObservable();

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
      if(res){
        this.authStateSubject.next(AuhLoadingState.LoggedIn);
      } else {
        this.authStateSubject.next(AuhLoadingState.UnAuthorized);
      }
    })
  }

  navigateTo(path: string) {
    this.router.navigate([path], { queryParams: { returnUrl: this.router.url } });
  }
}
