import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app_services/shop/product/product.service';
import { environment } from '@environments/environment';
import { ProductDetailsModel } from '../../../_models/shop/product/product-details';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.page.html'
})
export class ProductDetailsPage implements OnInit {

  product!: ProductDetailsModel;
  private productTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  productTitle$: Observable<string> = this.productTitleSubject.asObservable();
  isDataLoaded: boolean = false;

  baseProductPath: string = environment.productBaseImagePath + '/original/';
  baseProductPicturePath: string = environment.productPictureBaseImagePath + '/thumbnail/';

  constructor(
    private productService: ProductService,
    private _location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isDataLoaded = false;
    this.activatedRoute.params.subscribe(params => {
      const slug = params.slug;

      if (slug !== undefined) {
        this.productService.getProductDetails(slug)
          .subscribe((res) => {
            if (res.status === 'success') {
              this.productTitleSubject.next(res.data.title)
              this.product = res.data;
              this.isDataLoaded = true;

            }
          }, () => this._location.back()
          );
      }

    });

  }
}