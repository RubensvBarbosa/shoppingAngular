import { Recipe } from "./recipe.model";
import { Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from "rxjs";


@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A teste Recipe',
    //         'This is simply a test',
    //         'https://img.taste.com.au/mOx3fOxf/w720-h480-cfill-q80/taste/2022/09/garlic-chilli-prawn-pasta-181440-1.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Pasta',3)
    //         ]),
    //     new Recipe(
    //         'Another teste Recipe',
    //         'This is simply a test',
    //         'https://img.taste.com.au/mOx3fOxf/w720-h480-cfill-q80/taste/2022/09/garlic-chilli-prawn-pasta-181440-1.jpg',
    //         [
    //             new Ingredient('Rice', 2),
    //             new Ingredient('Tomatoes', 5)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService){}


    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];

    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())
    }


}