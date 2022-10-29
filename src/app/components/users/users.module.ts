import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsersComponent, 
    UsersListComponent,   
    UserCreateComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule    
  ]
})
export class UsersModule { }
