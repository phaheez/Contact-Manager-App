import { IDesignation } from './../models/IDesignation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = 'http://localhost:3000'; // json-server url

  constructor(private httpClient: HttpClient) { }

  // Get All Contacts
  public getAllContacts(): Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get Single Contact
  public getContact(contactId: number): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));
  }

  // Create a Contact
  public createContact(contact: IContact): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // Update a Contact
  public updateContact(contact: IContact, contactId: number): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // Delete a Contact
  public deleteContact(contactId: number): Observable<{}> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get All Designations
  public getAllDesignations(): Observable<IDesignation[]> {
    let dataUrl: string = `${this.serverUrl}/designations`;
    return this.httpClient.get<IDesignation[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get Single Designation
  public getDesignation(contact: IContact): Observable<IDesignation> {
    let dataUrl: string = `${this.serverUrl}/designations/${contact.designationId}`;
    return this.httpClient.get<IDesignation>(dataUrl).pipe(catchError(this.handleError));
  }

  // Error Handling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // client error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server error
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
    //return throwError(errorMessage);
  }
}
