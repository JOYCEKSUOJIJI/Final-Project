import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  panelOpenState = false;
  @Input() recipe!: Recipe;
  selectedRecipe = new EventEmitter<Recipe>();
  constructor(
    private recipeservice: RecipeService,
    private shoppinglistservice: ShoppingListService
  ) {}

  ngOnInit(): void {}

  addToShoppingList() {
    this.recipeservice.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
