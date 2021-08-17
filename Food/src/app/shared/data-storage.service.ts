import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeservice: RecipeService,
    private authservice: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeservice.getRecipes();
    this.http
      .put('https://ng-course-recipe-bookgldffaf;g.com/recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // return this.authservice.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     return this.http.get<Recipe[]>(
    //       'https://ng-course-recipe-bookgldffaf;g.com/recipes.json',
    //       {
    //         params: new HttpParams().set('auth', user.token)
    //       }
    //       // 'https://ng-course-recipe-bookgldffaf;g.com/recipes.json?auth=' +
    //       //   user.token
    //       //当user.token没有或者是undefined的情况，http request就会fail。 如何处理这种情况呢？
    //     );
    //   }),


    //加入HttpInterceptor之后的代码，把处理user token 的代码部分放入interceptor中
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

  // fetchRecipes() {
  //   return this.http
  //     .get<Recipe[]>('https://ng-course-recipe-bookgldffaf;g.com/recipes.json')
  //     .pipe(
  //       map((res) => {
  //         return res.map((ele) => {
  //           return {
  //             ...ele,
  //             ingredients: ele.ingredients ? ele.ingredients : [],
  //           };
  //         });
  //       }),
  //       tap((response) => {
  //         this.recipeservice.setRecipes(response);
  //       })
  //     );
  // }
}
