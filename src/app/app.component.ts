import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EMIShop';

  allProducts! : Array<any>;
  products! : Array<any>;
  categories! : Array<any>;
  errorMessage : string|null = null;

  searchFormGroup! : FormGroup;

  constructor(private service : AppService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });

    this.handleGetProducts();
  }

  handleGetProducts() : void {
    this.service.getProducts().subscribe({
      next : (data) => {
        this.allProducts = data.products;
        this.products = this.allProducts;
      },
      error : (err) => {
        this.errorMessage = err;
      }
    })
  }

  handleSearchForm() {
    this.products = this.allProducts.filter(p => p.title.includes((this.searchFormGroup.value.keyword)));
  }

}
