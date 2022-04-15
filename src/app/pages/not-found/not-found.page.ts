import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `
        <div class="error-area p-5">
            <div class="container">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="ml-auto mr-auto">
                        <div class="error-content text-center">
                            <div class="error-logo">
                                <a routerLink="/"><img src="assets/images/logo/logo.png" alt="logo"></a>
                            </div>
                            <div class="error-img">
                                <img src="assets/images/sadface.gif" alt="" height="400" width="400">
                            </div>
                            <h2> متاسفیم! صفحه مورد نظر یافت نشد!</h2>
                            <p> به نظر می رسد این صفحه دارای مشکل است لطفا بعد امتحان نمایید</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `
})
export class NotFoundPage {

  constructor() { }
}
