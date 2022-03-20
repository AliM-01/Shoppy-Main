import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "@app_services/auth/auth.service";
import { CartService } from "@app_services/order/cart.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutNotEmptyGuard implements CanActivate {

  constructor(private authService: AuthService,
    private cartService: CartService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.cartService.loadCart();
    const itemsData = this.cartService.getCartItems();

    if(itemsData.length > 0){
      return true;
    } else  {
      this.router.navigate(["/cart"]);
      return false;
    }
  }
}
