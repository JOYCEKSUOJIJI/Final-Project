import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // recipeSelected = new Subject<Recipe>();
  constructor(private shoppinglistservice: ShoppingListService) {}
  recipes: Recipe[] = [
    new Recipe(
      'a test',
      'Sometimes things go viral because they are really, really delicious.',
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
      [
        new Ingredient('cream', 1),
        new Ingredient('spouts', 200),
        new Ingredient('noodles', 200),
      ]
    ),
    new Recipe(
      'Baked Feta Pasta',
      'Sometimes things go viral because they are really, really delicious.',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
      [
        new Ingredient('eggs', 5),
        new Ingredient('bread', 1),
        new Ingredient('potatoes', 5),
      ]
    ),
    new Recipe(
      'corn soup',
      'Sometimes things go viral this is corn soup',
      'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      [
        new Ingredient('eggs', 5),
        new Ingredient('bread', 1),
        new Ingredient('potatoes', 5),
      ]
    ),
    new Recipe(
      'burger',
      'Sometimes things go viral because this is burger',
      'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
      [
        new Ingredient('eggs', 5),
        new Ingredient('bread', 1),
        new Ingredient('potatoes', 5),
      ]
    ),
  ];

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    return this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientToShoppingList(ing: Ingredient[]) {
    this.shoppinglistservice.addIngredients(ing);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
