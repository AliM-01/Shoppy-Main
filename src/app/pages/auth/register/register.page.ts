import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterRequestModel } from '@app_models/auth/_index';
import { AuthService } from '@app_services/auth/auth.service';
import { checkFormGroupErrors } from '@app_services/_common/functions/functions';
import { LoadingService } from '@app_services/_common/loading/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth-register',
  templateUrl: './register.page.html'
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  returnUrl: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loading: LoadingService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loading.loadingOn();

    this.authService.logout(false);

    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"];

    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });

    this.loading.loadingOff();

  }

  checkError(controlName: string, errorName: string): boolean {
    return checkFormGroupErrors(this.registerForm, controlName, errorName)
  }

  submitForm() {
    this.loading.loadingOn();

    if (this.registerForm.valid) {
      const registerData = new RegisterRequestModel(
        this.registerForm.controls.firstName.value,
        this.registerForm.controls.lastName.value,
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.confirmPassword.value,
      );

      this.authService.register(registerData)
        .subscribe(() => this.navigateToLogin());


    } else {
      this.registerForm.markAllAsTouched();
    }

    this.loading.loadingOff();

  }

  navigateToLogin(): void {
    if (this.returnUrl) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } });
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
