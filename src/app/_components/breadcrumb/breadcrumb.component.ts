import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <div class="breadcrumb-area breadcrumb-area-padding-2 bg-gray-2">
        <div class="custom-container">
          <div class="breadcrumb-content text-center">
            <ul>
              <li>
                <a routerLink="/">صفحه اصلی</a>
              </li>
              <li class="active"> {{ pageTitle }}</li>
            </ul>
          </div>
        </div>
    </div>
  `
})
export class BreadcrumbComponent implements OnInit {

  @Input() pageTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
