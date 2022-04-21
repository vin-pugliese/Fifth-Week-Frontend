import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  {

  panelOpenState = false;

  products: any[] = [];
 

  constructor(private httpClient: HttpClient) { 
    this.getAll();
    
    }


    getAll(){
    //get products
    this.httpClient.get<any>('http://localhost:8080/ecommerce/api/v1')
    .subscribe((e)=>{
      console.log(e)
      this.products = e;
      })
    }
}
