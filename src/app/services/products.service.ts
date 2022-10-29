import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(){
    //asking httpClient to retrieve the data from products.json
    return this.httpClient.get<any[]>("./../../assets/data/products.json")
  }
}
