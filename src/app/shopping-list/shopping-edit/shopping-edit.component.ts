import { Component, ElementRef, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  deleting = Subscription;

  constructor(private shoppingListService: ShoppingListService){}


  ngOnInit(): void {
      this.subscription = this.shoppingListService.startedEditing
        .subscribe(
          (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          }
        );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.removeIngredient(this.editedItemIndex);

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
