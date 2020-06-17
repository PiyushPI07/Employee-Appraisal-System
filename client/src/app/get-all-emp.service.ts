import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GetAllEmpService {

  constructor( ) { }
  getEmployees(): Promise<any>{
    return fetch("http://localhost:3000/getall", {
      method: 'GET'
    });

  }
}
