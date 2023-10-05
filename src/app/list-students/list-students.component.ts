import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Student } from '../student';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent {
  // 1. Dodamy interfejs Studenta
  // 2. Utworzymy sobie serwis do komunikacji z częścią backendową - wyślemy request GET
  // 3. Sprzawdzimy czy pobraliśmy dane

  isTableVisible = false;
  btnText = 'Pokaż';
  students: Student[] = [];

  constructor(private httpService: HttpService) {}

  showTable() {
    this.isTableVisible = !this.isTableVisible;
    if (this.isTableVisible) {
      this.btnText = 'Schowaj';
    } else {
      this.btnText = 'Pokaż';
    }
  }

  getData() {
    this.httpService.getStudents().subscribe((data) => {
      console.log(data);
      this.students = data;
    });
  }
}
