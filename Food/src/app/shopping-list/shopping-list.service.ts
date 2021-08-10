import { ThrowStmt } from '@angular/compiler';
import { EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsFromRecipe = new EventEmitter<Recipe>();
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
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ing: Ingredient[]) {
    this.ingredients.push(...ing);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
