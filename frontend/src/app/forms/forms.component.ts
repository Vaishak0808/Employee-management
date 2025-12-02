import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,private service:ServiceService) {
    this.form = this.fb.group({
      form_name: ['', Validators.required], // form name is mandatory
      fields: this.fb.array([]) // dynamic fields
    });
  }

  get formFields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  get formGroups(): FormGroup[] {
    return this.formFields.controls as FormGroup[];
  }

  addField() {
    this.formFields.push(
      this.fb.group({
        label: ['', Validators.required], 
        type: ['', Validators.required]    
      })
    );
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    moveItemInArray(this.formFields.controls, event.previousIndex, event.currentIndex);
  }

  removeField(index: number) {
    this.formFields.removeAt(index);
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }


    this.service.postFormData('employees/customeform/',this.form.value).subscribe((res:any)=>{
      
      if(res.status == 201){
        Swal.fire({
          title: 'Created Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }else{
        Swal.fire({
          title: 'Error',
          text:res.body.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },(error)=>{
      Swal.fire({
        title: error.error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    })
  }
}

