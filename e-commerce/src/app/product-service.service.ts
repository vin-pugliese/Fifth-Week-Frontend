import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './Model/Product';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient : HttpClient) {  }

  products: Product[] = [];

  getById(id :any): Observable<any>{
    let url='http://localhost:8080/ecommerce/api/v1/'
    return this.httpClient.get(url+id);
  }



}
