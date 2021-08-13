import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  panelOpenState = false;
  product!: Product;
  id!: number;
  constructor(
    private productservice: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.route);
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.id = +params['id'];
      console.log('fsfs', this.id);
      this.product = this.productservice.getProduct(this.id);
      console.log(this.product);
    });
  }
}
