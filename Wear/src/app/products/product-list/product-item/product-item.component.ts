import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() index!: number;
  constructor() { }

  ngOnInit(): void {
  }

  // addToShoppingList() {
  //   this.recipeservice.addIngredientToShoppingList(this.recipe.ingredients);
  // }

  // onAddRecipe() {
  //   this.router.navigate(['edit'], { relativeTo: this.route });
  // }

  // onDeleteRecipe() {
  //   this.recipeservice.deleteRecipe(this.id);
  //   this.router.navigate(['../'], { relativeTo: this.route });
  // }

}
