import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app_services/shop/product/product.service';
import { environment } from '@environments/environment';
import { ProductDetailsModel } from '../../../_models/shop/product/product-details';
import { BehaviorSubject, Observable } from 'rxjs';
import * as $ from 'jquery';
import 'magnific-popup';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.page.html'
})
export class ProductDetailsPage implements OnInit {

  product!: ProductDetailsModel;
  private productTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  productTitle$: Observable<string> = this.productTitleSubject.asObservable();
  isDataLoaded: boolean = false;

  baseProductPictureOriginalPath: string = environment.productPictureBaseImagePath + '/original/';
  baseProductPictureThumbnailPath: string = environment.productPictureBaseImagePath + '/thumbnail/';

  pictureIds: number[] = [];
  currentPicture: number = 1;

  mainSlideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1,
    "arrows": false, "draggable": false, "fade": false,
    "asNavFor": '.product-dec-slider-small'
  };

  picturesSlideConfig = {
    "slidesToShow": 2, "slidesToScroll": 1, "asNavFor": '.pro-dec-big-img-slider',
    "dots": false,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "focusOnSelect": true,
    "fade": false,
    "arrows": false,
    "responsive": [{
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
      }
    }
    ]
  };

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
              if (res.data.productPictures !== null) {
                res.data.productPictures.forEach(gallery => {
                  this.pictureIds.push(gallery.id)
                });
              }

              this.isDataLoaded = true;
            }
          }, () => this._location.back()
          );
      }

    });

  }
}