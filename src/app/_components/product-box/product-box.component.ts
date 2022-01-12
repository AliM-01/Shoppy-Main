import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { ProductModel } from '../../_models/shop/product/product';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {

  @Input() product!: ProductModel;
  baseProductPath: string = environment.productBaseImagePath + '/thumbnail/';

  constructor() { }
  ngOnInit(): void {
  }

}
