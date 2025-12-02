import { Component ,OnInit} from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
 formData:any
 selectedForm: any = null;
 dynamicForm: FormGroup = this.fb.group({});
 FormId:any
  constructor(private service:ServiceService,private fb: FormBuilder,public router: Router){

  }

  ngOnInit(): void {
      this.getFormDetails()
  }

  getFormDetails(){
    this.service.getData('employees/customeform').subscribe((res:any)=>{
      if(res.body.status == 1){
        this.formData = res.body.data
      }else{

      }
    },(error)=>{
      Swal.fire('Error', 'Failed to fetch forms', 'error');
    })
  }


  onFormSelect(selectedForm:any) {
    console.log('Selected Form:', selectedForm);  
    this.FormId =   selectedForm
    
  this.selectedForm = this.formData.find((form: any) => form.id === selectedForm);

  if (this.selectedForm) {
    let group: any = {};
    this.selectedForm.fields.forEach((field: any) => {
      group[field.label] = ['', Validators.required];
    });

    this.dynamicForm = this.fb.group(group);
  }
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
      let data = {
        formid : this.FormId,
        formDetails:this.dynamicForm.value
      }
      this.service.postFormData('employees/saveformdetails/',data).subscribe((res:any)=>{
        if(res.body.status == 1){
          this.router.navigateByUrl('forms-list')
          Swal.fire('Success', 'Employee created successfully!', 'success');
        }
      })
    } else {
      Swal.fire('Error', 'Please fill all required fields', 'error');
    }
  }

}