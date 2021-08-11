import { ThrowStmt } from '@angular/compiler';
// import { EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientsFromRecipe = new Subject<Recipe>();
  private ingredients: Ingredient[] = [
    new Ingredient('egg', 2),
    new Ingredient('tomatoes', 1),
    new Ingredient('potatoes', 5),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ing: Ingredient[]) {
    this.ingredients.push(...ing);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
