import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app_services/account/account.service';
import { UserProfileModel } from '../../_models/account/user-profile';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'user-dashboard-sidebar',
  templateUrl: './user-dashboard-sidebar.component.html',
  providers: [AccountService]
})
export class UserDashboardSidebarComponent implements OnInit {

  private userSubject: BehaviorSubject<UserProfileModel> = new BehaviorSubject<UserProfileModel>(new UserProfileModel("loading", "/assets/images/user/default-avatar.png"));
  user$: Observable<UserProfileModel> = this.userSubject.asObservable();;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe((res) => this.userSubject.next(res))
  }
}
