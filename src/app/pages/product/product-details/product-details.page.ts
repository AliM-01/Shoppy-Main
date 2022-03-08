import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@app_services/shop/product/product.service';
import { environment } from '@environments/environment';
import { ProductDetailsModel } from '../../../_models/shop/product/product-details';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { LoadingService } from '../../../_services/_common/loading/loading.service';
import { MessengerService } from '@app_services/_common/messenger/messenger.service';
import { CartService } from '@app_services/cart/cart.service';
import { CartItemCookieModel } from '@app_models/order/cart-item-cookie';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.page.html'
})
export class ProductDetailsPage implements OnInit {

  product: ProductDetailsModel;
  private productTitleSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  productTitle$: Observable<string> = this.productTitleSubject.asObservable();
  isDataLoaded: boolean = false;
  isInCart: boolean = false;

  tags: string[] = [];

  baseProductPictureOriginalPath: string = environment.productPictureBaseImagePath + '/original/';
  baseProductPictureThumbnailPath: string = environment.productPictureBaseImagePath + '/thumbnail/';

  pictureIds: string[] = [];
  currentPicture: string = "";

  mainSlideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1,
    "arrows": false, "draggable": false, "fade": false
  };

  picturesSlideConfig = {
    "slidesToShow": 4, "slidesToScroll": 1,
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
    private loading: LoadingService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private msg: MessengerService,
    private cartService: CartService,
  ) {
    this.loading.loadingOn();
  }

  ngOnInit(): void {
    this.loading.loadingOn();
    this.isDataLoaded = false;
    this.activatedRoute.params.subscribe(params => {
      const slug = params.slug;

      if (slug !== undefined) {
        this.getProduct(slug);
      }

    });

  }

  getProduct(slug: string) {
    this.loading.loadingOn();

    this.productService.getProductDetails(slug)
      .subscribe((res) => {
        this.loading.loadingOn();

        if (res.status === 'success') {
          this.productTitleSubject.next(res.data.title)
          this.product = res.data;
          if (res.data.productPictures !== null) {
            res.data.productPictures.forEach(gallery => {
              this.pictureIds.push(gallery.id)
            });
          }
          console.log(res);

          this.tags = res.data.metaKeywords.split(",");
          this.setMetaTags(res.data)

          this.isDataLoaded = true;
          this.loading.loadingOff();

        }
      },
        () => {
          this._location.back()
          this.loading.loadingOff();
        }
      );
  }

  setMetaTags(data: ProductDetailsModel) {
    this.title.setTitle(data.title);
    this.meta.addTags([
      { name: 'keywords', content: data.metaKeywords },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'shoppy' },
      { name: 'description', content: data.metaDescription },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }

  setSlider(id: string) {
    let activeSliders = Array.from(document.getElementsByClassName("product_details_sub_slider"));;

    activeSliders.forEach(activeSlider => activeSlider.classList.remove('active'));

    let sliderBox = document.getElementById("main_slider");

    const pictureItem = this.product.productPictures.find(e => e.id === id);

    sliderBox.setAttribute('src',
      this.baseProductPictureOriginalPath + pictureItem.imagePath);
    this.currentPicture = id;
  }

  handleCartChanges() {
    this.msg.getMsg().subscribe((event: any) => {
      this.checkProductIsInCart();
    })
  }

  checkProductIsInCart() {
    this.cartService.itemInCart(this.product.id).subscribe((res: boolean) => {
      this.isInCart = res;
    })
  }
  addToCart() {
    const item = new CartItemCookieModel(this.product.id, this.product.title, this.product.slug,
      this.product.unitPrice, this.product.imagePath, 1)

    this.cartService.addToCart(item);
    this.msg.sendMsg("added item");
  }

  removeFromCart() {
    this.cartService.removeItem(this.product.id);
    this.msg.sendMsg("remove item");
  }
}
