import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  getStudents() {
    return this.httpClient.get<Student[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
}
