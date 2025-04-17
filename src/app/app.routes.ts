import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { SettingComponent } from './setting/setting.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
    {path : '' , component : HomeComponent},
    {path:'quiz',component :QuizComponent},
    {path:'setting', component :SettingComponent},
    {path:'history',component:HistoryComponent}
];
