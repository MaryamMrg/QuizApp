import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 selectedCategory='';
 selectedDifficulty='';

 constructor(private router:Router){}

 onCategoryChange(event : Event){
  this.selectedCategory=(event.target as HTMLSelectElement).value;
 }
 onDifficultyChange(event:Event){
  this.selectedDifficulty=(event.target as HTMLSelectElement).value;
 }
   
 startQuiz(){
  this.router.navigate(['/quiz'], {
    queryParams:{
      category:this.selectedCategory,
      difficulty : this.selectedDifficulty
    }
  });
 
 }
}
