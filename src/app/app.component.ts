import { Component } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { Employee } from 'src/interfaces/Employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fetching = false;
  error = false;

  creating = false;

  formGroup = new FormGroup({
    name:new FormControl('',[Validators.required]),
    salary:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required]),
    imageUrl:new FormControl('')
  });

  employees:Employee[];

  constructor(private employeeService:EmployeeService){}

  async ngOnInit(){
    this.getEmployees();
  }

  async getEmployees(){
    this.fetching = true;
    try{
      this.employees = await this.employeeService.getEmployees();
      console.log(this.employees)
    }catch (err) {
      this.error = true;
    }

    this.fetching = false;
  }

  deleteEmployee(id:string){
    this.fetching = true;
    this.employeeService.deleteEmployee(id).then(()=>{
      this.getEmployees();
    })
  }

  onSubmit(){
    this.creating = true;
    this.employeeService.createEmployee(this.formGroup.value).then(()=>{
      this.creating = false;
      this.getEmployees();
    }).catch(()=>{
      this.creating = false;
    })
    this.formGroup.reset();
  }
}
