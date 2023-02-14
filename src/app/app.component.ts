import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe'
  recipes = false;
  shopping = false;
  
  onNavigate(f: string){
    this.loadedFeature = f;
  }
}
