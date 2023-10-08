import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  studentApiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) {}

  // funkcja wysyłająca request GET - pobranie tablicy studentów z API
  getStudents() {
    return this.httpClient.get<Student[]>(this.studentApiUrl);
  }

  // funkcja wysyłająca request GET/id - pobranie studenta o podanym id
  getStudent(id: number) {
    let getStudentUrl = this.studentApiUrl + '/' + id;
    return this.httpClient.get<Student>(getStudentUrl);
  }

  // funkcja wysyłająca request DELETE - usuwającą studenta o podanym id
  deleteStudent(id: number) {
    let deleteStudentUrl = this.studentApiUrl + '/' + id;
    return this.httpClient.delete<Student>(deleteStudentUrl);
  }

  // funkcja wysyłająca request POST - nadpisanie tablicy
  addStudent(student: Student) {
    return this.httpClient.post<Student>(this.studentApiUrl, student);
  }

  // funkcja wysyłająca request PUT - nadpisanie studenta o podanym id
  updateStudent(student: Student) {
    let updateStudentUrl = this.studentApiUrl + '/' + student.id;
    return this.httpClient.put<Student>(updateStudentUrl, student);
  }
}
