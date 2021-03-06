import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';

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
    // find the target product to do edit
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  //init edit form
  private initForm() {
    let ProductId = null;
    let ProductTitle = '';
    let ImageURL = '';
    let Price = null;
    let Gender = '';
    let Category = '';
    let SubCategory = '';
    let ProductType = '';
    let Usage = '';
    let Colour = '';
    if (this.editMode) {
      const product = this.productservice.getProduct(this.id);
      ProductId = product.ProductId;
      ProductTitle = product.ProductTitle;
      ImageURL = product.ImageURL;
      Price = product.Price;
      Category = product.Category;
      Gender = product.Gender;
      SubCategory = product.SubCategory;
      ProductType = product.ProductType;
      Usage = product.Usage;
      Colour = product.Colour;
    }

    this.productForm = new FormGroup({
      ProductId: new FormControl(ProductId, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
      ProductTitle: new FormControl(ProductTitle, Validators.required),
      ImageURL: new FormControl(ImageURL, Validators.required),
      Price: new FormControl(Price, [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]),
      Gender: new FormControl(Gender, Validators.required),
      Category: new FormControl(Category, Validators.required),

      SubCategory: new FormControl(SubCategory, Validators.required),
      ProductType: new FormControl(ProductType, Validators.required),
      Usage: new FormControl(Usage, Validators.required),
      Colour: new FormControl(Colour, Validators.required),
    });
  }

  //cancel edit
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (this.editMode) {
      this.productservice.updateProduct(this.id, this.productForm.value);
    } else {
      this.productservice.addProduct(this.productForm.value);
    }
    console.log(this.productForm);
    this.onCancel();
  }
}

