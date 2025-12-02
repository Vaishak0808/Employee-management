import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {  throwError,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private ApiUrl =  'http://localhost:8000/'


  headers:any

  constructor(
    private http:HttpClient,
    private router:Router
  ) {}

  loginCheck(url:any,data:any){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.ApiUrl + url,data,{headers : this.headers,observe: 'response'}).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.Logout();
          return of(null);
        }
        return throwError(() => error); 
      })
    );
  }

  getData(url:any){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    });

    
    
   return this.http.get(this.ApiUrl + url,{headers : this.headers,observe: 'response'}).pipe(
    catchError((error) => {

      if (error.status === 401) {
        this.Logout();
        return of(null); 

      }
      return throwError(() => error); 
    })
  );

  }

  postData(url:any,data:any){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    });
   return this.http.post(this.ApiUrl + url,data,{headers : this.headers,observe: 'response'}).pipe(
    catchError((error) => {
      if (error.status === 401) {
        this.Logout();
        return of(null);
      }
      return throwError(() => error); 
    })
  );
  }

  postFormData(url:any,data:any){

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    });

    return this.http.post(this.ApiUrl + url,data,{headers : this.headers,observe: 'response'}).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.Logout();
          return of(null);
        }
        return throwError(() => error); 
      })
    );
  }

  Logout(){
    this.router.navigateByUrl('login')
    localStorage.clear()
    Swal.fire({
      title: 'Session has expired. Please login again to continue.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
    
    return
  }

}
