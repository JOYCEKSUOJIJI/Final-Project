import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  name!: string;
  description!: string;
  imgPath!: string;
  ingredients!: Ingredient[];

  constructor(
    name: string,
    description: string,
    imgPath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.ingredients = ingredients;
  }
}
