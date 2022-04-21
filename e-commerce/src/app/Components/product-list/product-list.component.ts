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
  carts: any[] = [];
  formdata: any;

  constructor(private httpClient: HttpClient) { 
    //get products
    this.httpClient.get<any>('http://localhost:8080/ecommerce/api/v1')
      .subscribe((e)=>{
        console.log(e)
        this.products = e;
      })

      //get cart
    this.httpClient.get<any>('http://localhost:8080/ecommerce/api/v1/cart')
      .subscribe((e)=>{
        console.log(e)
        this.carts = e;
      })
  }

  handleSubmit(data: { qty: any; prodId: any; }){
    let cartId: String = this.carts[0].id;

    let qty = data.qty;
    let prodId = data.prodId;
    console.log('qty: '+qty +'cartid: '+ cartId +'prodid' +prodId);

    this.httpClient.put('http://localhost:8080/ecommerce/api/v1/cart/add?idcart='+cartId+'&idprod='+prodId+'&qty='+qty,{});

  }

}
