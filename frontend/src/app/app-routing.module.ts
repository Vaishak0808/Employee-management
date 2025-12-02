import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsComponent } from './forms/forms.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormListComponent } from './form-list/form-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path : '',component:MainPageComponent,children:[
    { path:'employee',component: EmployeeComponent},
    { path:'forms',component: FormsComponent},
    { path:'forms-list',component: FormListComponent}
  ]
  }

  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
