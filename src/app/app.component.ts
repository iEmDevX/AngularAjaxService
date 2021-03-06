import { Component, OnInit } from '@angular/core';
import { AjaxService } from './services/ajax.service';

const URLS = {
  GET_USER: 'https://jsonplaceholder.typicode.com/users'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataGet: ResponseData;
  dataPost: ResponseData;
  dataPut: ResponseData;
  dataDelete: ResponseData;

  constructor(
    private ajax: AjaxService,
  ) { }

  ngOnInit() {
    this.callFunc();
  }

  async callFunc() {
    await this.getM();
    await this.postM();
    await this.deleteM();
    await this.putM();
  }

  getM() {
    this.ajax.doGet(URLS.GET_USER).subscribe((response: ResponseData) => {
      this.dataGet = response;
      console.log(response);
    });
  }

  postM() {
    this.ajax.doPost(URLS.GET_USER, {}).subscribe((response: ResponseData) => {
      this.dataPost = response;
      console.log(response);
    });
  }

  deleteM() {
    this.ajax.doDelete(URLS.GET_USER + '/5').subscribe((response: ResponseData) => {
      this.dataDelete = response;
      console.log(response);
    });
  }

  putM() {
    this.ajax.doPut(URLS.GET_USER + '/1', {}).subscribe((response: ResponseData) => {
      this.dataPut = response;
      console.log(response);
    });
  }
}

// Generated by https://quicktype.io

export interface ResponseData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
