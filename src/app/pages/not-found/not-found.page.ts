import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `
        <div class="error-area p-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8 ml-auto mr-auto">
                        <div class="error-content text-center">
                            <div class="error-logo">
                                <a href="index-2.html"><img src="assets/images/logo/logo.png" alt="logo"></a>
                            </div>
                            <div class="error-img">
                                <img src="assets/images/banner/page-404-image.jpg" alt="">
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