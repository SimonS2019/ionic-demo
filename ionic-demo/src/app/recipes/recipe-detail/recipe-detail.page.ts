import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { AlertController } from '@ionic/angular';

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
    private recipesService: RecipesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) {}
 
  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('recipeId')) {
        return;
      }
      const recipeId: string | null = paramMap.get('recipeId');
      if (recipeId != null) {
        this.loadedRecipe= this.recipesService.getRecipe(recipeId);
      }
    });
  }
  
  onDeleteRecipe() {
    this.alertCtrl
      .create({
        header: 'Are you sure?',
        message: 'Do you really want to delete the recipe?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
              this.recipesService.deleteRecipe(this.loadedRecipe.id);
              this.router.navigate(['/recipes']);
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
 