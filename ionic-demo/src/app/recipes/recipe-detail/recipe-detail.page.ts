import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe = {
    id: '',
    title: '',
    imageUrl: '',
    ingredients: []
  };
 
  constructor(
    private recipeService: RecipesService,
    private activateRoute: ActivatedRoute
  ) {}
 
  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        return;
      }
      const recipeId: string | null = paramMap.get('recipeId');
      if (recipeId != null) {
        this.loadedRecipe= this.recipeService.getRecipe(recipeId);
      }
    });
  }
}
 