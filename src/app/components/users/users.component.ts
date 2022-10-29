import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersObservable = new Observable<any[]>();

  constructor(private usersService : UsersService) { }

  ngOnInit(): void {
    this.usersObservable = this.usersService.getUsers();
  }

}
