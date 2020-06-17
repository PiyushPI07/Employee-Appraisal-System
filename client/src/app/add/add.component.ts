import { Component, OnInit, VERSION, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor() { }
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  employee={
    emp_id: '',
    first_name :'',
    last_name : '',
    dob: '',
    gender: '',
    department: '',
    position: '',
    salary:'',
    phone:'',
    address: '',
    email:''
  };
  breakpoint: number;
  ngOnInit(): void {
  this.breakpoint = (window.innerWidth <= 400) ? 3 : 6;

  }
  async onSubmit(form: NgForm){
    await fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body:JSON.stringify(this.employee)
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        form.resetForm();
        window.alert("Employee Added Succesfully!")

      })
      .catch(error => {
        console.log(error)
      })
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 3 : 6;
  }
}
