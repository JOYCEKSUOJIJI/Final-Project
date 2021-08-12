import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  recipe!: Recipe;
  id!: number;

  selectedRecipe = new EventEmitter<Recipe>();
  constructor(
    private recipeservice: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeservice.getRecipe(this.id);
    });
  }

  addToShoppingList() {
    this.recipeservice.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onAddRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
