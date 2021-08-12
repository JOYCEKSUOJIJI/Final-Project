import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription!: Subscription;

  constructor(private shoppinglistservice: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppinglistservice.getIngredients();
    this.subscription = this.shoppinglistservice.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }


  onEditItem(id: number) {
    this.shoppinglistservice.startedEditing.next(id);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
