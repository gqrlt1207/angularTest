import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessDetailsComponent } from './process-details/process-details.component';
import { AddProcessComponent } from './add-process/add-process.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './authGurad';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'logout', redirectTo: '/login', pathMatch: 'full'},
  { path: 'processes', component: ProcessListComponent, canActivate: [LoginGuard]},
  { path: 'add', component: AddProcessComponent, canActivate: [LoginGuard] },
  { path: 'details/:id', component: ProcessDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
