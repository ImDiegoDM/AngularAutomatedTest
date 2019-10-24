import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/interfaces/Employee';

const API_ENDPOINT = "http://dummy.restapiexample.com/api";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees():Promise<Employee[]> {
    return new Promise((res,rej)=>{
      this.http.get(`${API_ENDPOINT}/v1/employees`).subscribe((response:any)=>{
        res(response);
      },err=>rej(err))
    });
  }

  getSingleEmployee(id:string):Promise<Employee>{
    return new Promise((res,rej)=>{
      this.http.get(`${API_ENDPOINT}/v1/employee/${id}`).subscribe((response:any)=>{
        res(response);
      },err=>rej(err))
    });
  }

  createEmployee(emp:Employee):Promise<Employee>{
    return new Promise((res,rej)=>{
      this.http.post(`${API_ENDPOINT}/v1/create`,emp).subscribe((response:any)=>{
        res(response);
      },err=>rej(err))
    });
  }

  updateEmployee(id:string,emp:Employee):Promise<Employee>{
    return new Promise((res,rej)=>{
      this.http.put(`${API_ENDPOINT}/v1/employee/${id}`,emp).subscribe((response:any)=>{
        res(response);
      },err=>rej(err))
    });
  }

  deleteEmployee(id:string):Promise<any>{
    return new Promise((res,rej)=>{
      this.http.delete(`${API_ENDPOINT}/v1/delete/${id}`).subscribe(()=>{
        res();
      },err=>rej(err))
    });
  }

}
