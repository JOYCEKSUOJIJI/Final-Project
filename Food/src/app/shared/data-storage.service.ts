import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeservice: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeservice.getRecipes();
    this.http
      .put('https://ng-course-recipe-bookgldffaf;g.com/recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://ng-course-recipe-bookgldffaf;g.com/recipes.json')
      .pipe(
        map((res) => {
          return res.map((ele) => {
            return {
              ...ele,
              ingredients: ele.ingredients ? ele.ingredients : [],
            };
          });
        }),
        tap((response) => {
          this.recipeservice.setRecipes(response);
        })
      );
  }
}
