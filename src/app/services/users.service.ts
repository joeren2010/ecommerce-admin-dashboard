import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(){
    //asking httpClient to retrieve the data from users.json
    return this.httpClient.get<any[]>("./../../assets/data/users.json")
  }
}
