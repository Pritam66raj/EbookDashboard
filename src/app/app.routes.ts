import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from '../guard/auth.guard';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'dashboard', component:DashboardComponent,canActivate:[authGuard]},
    {path:'', redirectTo:'login',pathMatch:'full'},
];
