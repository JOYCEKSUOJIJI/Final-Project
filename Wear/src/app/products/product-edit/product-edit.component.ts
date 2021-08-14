import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  id!: number;
  editMode = false;
  productForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private productservice: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('hellpe');
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log('here is product edit', this.id);
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let productId = null;
    let productName = '';
    let productImg = '';
    let productPrice = null;
    let productGender = '';
    let productCategory = '';
    let productSubCategory = '';
    let productType = '';
    let productUsage = '';
    let productColor = '';
    if (this.editMode) {
      const product = this.productservice.getProduct(this.id);
      productId = product.productId;
      productName = product.productTitle;
      productImg = product.productImg;
      productPrice = product.price;
      productCategory = product.category;
      productGender = product.gender;
      productSubCategory = product.subCategory;
      productType = product.productType;
      productUsage = product.usage;
      productColor = product.color;
    }

    this.productForm = new FormGroup({
      productId: new FormControl(productId, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
      productTitle: new FormControl(productName, Validators.required),
      productImg: new FormControl(productImg, Validators.required),
      price: new FormControl(productPrice, [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
      gender: new FormControl(productGender, Validators.required),
      category: new FormControl(productCategory, Validators.required),

      subCategory: new FormControl(productSubCategory, Validators.required),
      productType: new FormControl(productType, Validators.required),
      usage: new FormControl(productUsage, Validators.required),
      color: new FormControl(productColor, Validators.required),
    });
    console.log(this.productForm.value.imgPath);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    if (this.editMode) {
      this.productservice.updateRecipe(this.id, this.productForm.value);
    } else {
      this.productservice.addRecipe(this.productForm.value);
    }
    console.log(this.productForm);
    this.onCancel();
  }
}
