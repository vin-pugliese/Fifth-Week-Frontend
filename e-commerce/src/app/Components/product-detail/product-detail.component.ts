import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/Product';
import { ProductServiceService } from 'src/app/product-service.service';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/app/Model/Cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product ?: Product

  cart: Cart | undefined;
  carts: any [] = []

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private productService: ProductServiceService,
              private httpClient : HttpClient
              ) {}


  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.loadProduct();
    this.loadCart();
  }

  loadProduct(){
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getById(productId)
    .subscribe( data => {
      this.product = data;
    });
  }

  loadCart(){
    this.httpClient.get<any>('http://localhost:8080/ecommerce/api/v1/cart')
      .subscribe((e)=>{
        //console.log(e)
        this.carts = e;
        //console.log(this.cart);
      })

  }

  handleSubmit(data: { qty: any; prodId: any; }){
    this.cart = this.carts[0];
    

    let qty1 = data.qty; 

    console.log('cartid:' +this.cart?.id + ' prodid' +this.product?.id +' qty' +qty1);
    

    this.httpClient.post('http://localhost:8080/ecommerce/api/v1/cart/add?idcart='+this.cart?.id,
                                                                                  {id: this.product?.id, 
                                                                                  nome: this.product?.nome,
                                                                                  description: this.product?.description,
                                                                                  qty: data.qty});

    //,{this.cart?.id'&idprod='+this.product?.id+'&qty='+qty});

  }

}
