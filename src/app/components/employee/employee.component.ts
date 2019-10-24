import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/interfaces/Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input() employee:Employee
  @Output() onDelete = new EventEmitter<Employee>()

  constructor() { }

  ngOnInit() {
  }

}
