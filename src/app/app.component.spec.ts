import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeService } from 'src/services/employee.service';

const listEmployee = [
  {
    id:'1',
    employee_name:'diego',
    employee_salary:'10000000000',
    employee_age:'26',
    profile_image:''
  },
  {
    id:'2',
    employee_name:'jorge',
    employee_salary:'-20',
    employee_age:'18',
    profile_image:''
  }
]

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('EmployeeService',['getEmployees','deleteEmployee','createEmployee'])

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        EmployeeComponent
      ],
      providers:[
        {provide:EmployeeService,useValue:spy}
      ]
    }).compileComponents();

    employeeServiceSpy = TestBed.get(EmployeeService)
    employeeServiceSpy.getEmployees.and.returnValue(new Promise((res)=>res(listEmployee)))
    employeeServiceSpy.deleteEmployee.and.returnValue(new Promise((res)=>res()))
    employeeServiceSpy.createEmployee.and.returnValue(new Promise((res)=>res()))
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have formGroup with correct params`, () => {

    const formGroup = component.formGroup;

    expect(formGroup.controls.employee_name).toBeTruthy();
    expect(formGroup.controls.employee_salary).toBeTruthy();
    expect(formGroup.controls.employee_age).toBeTruthy();
    expect(formGroup.controls.profile_image).toBeTruthy();
  });

  it('should have h1', () =>{
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain('Employee');
  });

  it('should call employee service when start and when deleting',(done)=>{
    employeeServiceSpy.getEmployees.calls.mostRecent().returnValue.then(()=>{
      fixture.detectChanges();
      expect(employeeServiceSpy.getEmployees.calls.count()).toBe(1);
      const compiled = fixture.debugElement.nativeElement;

      const button = compiled.querySelector('app-employee button');
      button.click();

      fixture.detectChanges();
      expect(employeeServiceSpy.deleteEmployee.calls.count()).toBe(1);
      expect(employeeServiceSpy.deleteEmployee.calls.mostRecent().args).toEqual(['1']);
      done();
    })
  })

  it('should call employee service when submit a form',(done)=>{
    const formGroup = component.formGroup;

    formGroup.controls.employee_name.setValue('Diego');
    formGroup.controls.employee_salary.setValue('1000000000');
    formGroup.controls.employee_age.setValue('26');
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const submit = compiled.querySelector('input[type="submit"]');

    submit.click();

    fixture.detectChanges();

    const funcArgs = employeeServiceSpy.createEmployee.calls.mostRecent().args[0];
    
    expect(employeeServiceSpy.createEmployee.calls.count()).toBe(1);
    expect(funcArgs.employee_name).toBe('Diego');
    expect(funcArgs.employee_age).toBe('26');
    expect(funcArgs.employee_salary).toBe('1000000000');
    done();
  })
});
