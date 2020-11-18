import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;

  validationErrors: any;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(): void{
    this.http.get(this.baseUrl + 'products/42').subscribe(response => {
      console.log(response);
    },
    errors => {
      console.log(errors);
    });
  }
  get500Error(): void{
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      console.log(response);
    },
    errors => {
      console.log(errors);
    });
  }
  get400Error(): void{
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
      console.log(response);
    },
    errors => {
      console.log(errors);
    });
  }
  get400ValidationError(): void{
    this.http.get(this.baseUrl + 'products/quarentaedois').subscribe(response => {
      console.log(response);
    },
    errors => {
      console.log(errors);
      this.validationErrors = errors.errors;
    });
  }
}
