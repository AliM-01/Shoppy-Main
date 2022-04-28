import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app_services/account/account.service';

@Component({
  selector: 'user-dashboard-sidebar',
  templateUrl: './user-dashboard-sidebar.component.html',
  providers: [AccountService]
})
export class UserDashboardSidebarComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {

  }
}
