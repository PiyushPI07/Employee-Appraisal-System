import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {GetAllEmpService} from '../get-all-emp.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private data: GetAllEmpService) { }
  employees: Object;
  employee:object;
  selected_emp  ;
  update:boolean;
  info:boolean;
  toggleInfo(emp) {
    this.selected_emp = emp;
    this.info = !this.info;
    this.update = false
  }

  async deleteEmployee(emp){
  
    await fetch('http://localhost:3000/delete', {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id: emp._id
      })
    }).then(response => response.json())
    .then(message => {
      console.log(message)
      window.alert("Employee Deleted Succesfully!")

    })
      .catch(err => console.log(err))
    await this.data.getEmployees().then((response) => {
      response.json().then((data) => {
        this.employees = data;
        console.log(this.employees)
      })
    })
  }

  updateEmployee(emp){

    this.selected_emp = emp;
    this.update = !this.update;
    this.info = false;
  }

  async onUpdate() {
    console.log(this.selected_emp)
    await fetch("http://localhost:3000/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.selected_emp)
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        window.alert("Data Updated Successfully!")
        this.update = false
      })
      .catch(error => {
        console.log(error)
      })
  }



  // async update(){

  // }
  ngOnInit(){  
    this.data.getEmployees().then((response) => {
      response.json().then((data)=> {
        this.employees = data;
        console.log(this.employees)
      })
    })
  }
  
}
