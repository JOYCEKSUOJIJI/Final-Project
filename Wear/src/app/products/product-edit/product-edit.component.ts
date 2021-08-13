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
  recipeForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private productservice: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("hellpe");
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log('here is product edit', this.id);
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const product = this.productservice.getProduct(this.id);
      recipeName = product.category;
      recipeImgPath = product.productImg;
      recipeDescription = product.productTitle;
      // if (product['ingredients']) {
      //   for (let ing of product.ingredients) {
      //     recipeIngredients.push(
      //       new FormGroup({
      //         name: new FormControl(ing.name, Validators.required),
      //         amount: new FormControl(ing.amount, [
      //           Validators.required,
      //           Validators.pattern('^[1-9]+[0-9]*$'),
      //         ]),
      //       })
      //     );
      //   }
      // }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imgPath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
