import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BancService {

  apiUrl: string = 'https://bast.dev/api/banks.php';
  apiBackend: string = 'http://localhost:8080/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create Destinatario
  createDestinatario(data:any): Observable<any> {
    let API_URL = `${this.apiBackend}/destinatario/add-new`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  createTransferencia(data:any): Observable<any> {
    let API_URL = `${this.apiBackend}/destinatario/transferir`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  showTransferencias() {
    return this.http.get(`${this.apiBackend}/destinatario/transferencias`)
  }


  // Read Bancs
  showBancs() {
    return this.http.get(`${this.apiUrl}`);
  }

  getDestinatarios() {
    return this.http.get(`${this.apiBackend}/all-destinatarios`);
  }

  // Update
  // updateTask(id:number, data:string): Observable<any> {
  //   let API_URL = `${this.apiUrl}/update-task/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers }).pipe(
  //     catchError(this.error)
  //   )
  // }

  // Delete
  // deleteTask(id): Observable<any> {
  //   var API_URL = `${this.apiUrl}/delete-task/${id}`;
  //   return this.http.delete(API_URL).pipe(
  //     catchError(this.error)
  //   )
  // }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
