import { Component,OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent  implements OnInit{

  displayedColumns: string[] = [
    'SL_No',
    'form_name',
    'created_date',
    'created_by',
  ];
  dataSource:any

  formData :any
  constructor(private service:ServiceService,public router: Router){

  }
ngOnInit(): void {
  this.getFormDetails()
}
getFormDetails(){
  this.service.getData('employees/saveformdetails').subscribe((res:any)=>{
    if(res.body.status == 1){
      this.formData = res.body.data
      this.dataSource = new MatTableDataSource(this.formData);

    }else{

    }
  },(error)=>{
    Swal.fire('Error', 'Failed to fetch details', 'error');
  })
}

}
