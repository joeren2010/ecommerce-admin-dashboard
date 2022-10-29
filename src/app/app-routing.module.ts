import { AuthComponent } from './components/auth/auth.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { MeetingsCalenComponent } from './components/meetings/meetings-calen/meetings-calen.component';
import { MeetingsListComponent } from './components/meetings/meetings-list/meetings-list.component';
import { MeetingsCreateComponent } from './components/meetings/meetings-create/meetings-create.component';
import { MeetingsUpdateComponent } from './components/meetings/meetings-update/meetings-update.component';


const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"auth", children: [
    {path:"", component: AuthComponent},
    {path:"change-password", component: ChangePasswordComponent},
    {path:"login", component: LoginComponent},
    {path:"register", component: RegisterComponent},
  ]},  
  {path:"home", component: HomeComponent},
  {path:"about", component: AboutComponent},
  {path:"products", children: [
    {path:"", component: ProductsComponent},
    {path:"categories", component: CategoriesComponent},
  ]},
  {path:"orders", component: OrdersComponent},
  {path:"calendar", component: CalendarComponent},
  {path:"meetings", children: [
    {path:"", component: MeetingsComponent},
    {path:"meetings-calen", component: MeetingsCalenComponent},
    {path:"meetings-list", component: MeetingsListComponent},
    {path:"meetings-create", component: MeetingsCreateComponent},    
    {path:"meetings-update", component: MeetingsUpdateComponent},
  ]},
  {path:"users", children: [
    {path:"", component: UsersComponent},
    {path:"users-list", component: UsersListComponent},
    {path:"user-create", component: UserCreateComponent},
    {path:"user-profile", component: UserProfileComponent},
  ]},  
  {path:"**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
