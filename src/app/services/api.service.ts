import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public postContact(data: any) {
    return this.http.post<any>(`${this.serverUrl}/contacts`, data);
  }

  public getContact() {
    return this.http.get<any>(`${this.serverUrl}/contacts`);
  }

  public putContact(data: any, id: number) {
    return this.http.put<any>(`${this.serverUrl}/contacts/${id}`, data);
  }

  public deleteContact(id: number) {
    return this.http.delete<any>(`${this.serverUrl}/contacts/${id}`);
  }

  public getDesignations() {
    return this.http.get<any>(`${this.serverUrl}/designations`);
  }
}
