import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Student } from '../student';
import { DisplayingType } from '../displaying-type';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent {
  // 1. Dodamy interfejs Studenta
  // 2. Utworzymy sobie serwis do komunikacji z częścią backendową - wyślemy request GET
  // 3. Sprzawdzimy czy pobraliśmy dane

  // Usuwanie
  // 1. Dodanie przycisku do usunięcia danych
  // 2. Wysyłanie requesta HTTP - DELETE ->
  // 3. Napisać metodę usuwania

  isTableVisible = true;
  btnText = 'Schowaj';
  students: Student[] = [];
  displayingMode: DisplayingType = DisplayingType.TABLE;
  DisplayingType = DisplayingType;
  copyStudents: Student[] = [];
  searchPhrase = '';
  darkTableMode = 'table-dark';
  isDarkMode = false;
  tableMode = '';
  notChecked = true;
  newChecked: number[] = [];

  constructor(private httpService: HttpService) {
    this.getData();
  }

  showTable() {
    this.isTableVisible = !this.isTableVisible;
    if (this.isTableVisible) {
      this.btnText = 'Schowaj';
    } else {
      this.btnText = 'Pokaż';
    }
    this.newChecked = [];
    this.notChecked = true;
  }

  getData() {
    this.newChecked = [];
    this.notChecked = true;
    this.httpService.getStudents().subscribe((data) => {
      console.log(data);
      this.students = data;
      this.copyStudents = data;
    });
  }

  changeTableMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.tableMode = 'table-dark';
    } else {
      this.tableMode = '';
    }
  }

  delete(id: number) {
    this.httpService.deleteStudent(id).subscribe(() => {
      this.students = this.students.filter((x) => x.id != id);
      this.copyStudents = this.students;
    });
  }

  changeStatus(event: any, studentId: number) {
    if (event.checked) {
      this.newChecked.push(studentId);
    } else {
      this.newChecked = this.newChecked.filter((x) => x != studentId);
    }
    if (this.newChecked.length > 0) {
      this.notChecked = false;
    } else {
      this.notChecked = true;
    }
  }

  deleteGlobalStudents() {
    this.newChecked.forEach((x) => {
      this.httpService.deleteStudent(x).subscribe(() => {
        this.students = this.students.filter((d) => d.id != x);
        this.copyStudents = this.students;
      });
    });
    this.newChecked = [];
    this.notChecked = true;
  }

  changeDisplayingMode() {
    if (this.displayingMode == DisplayingType.TABLE) {
      this.displayingMode = DisplayingType.LIST;
    } else {
      this.displayingMode = DisplayingType.TABLE;
    }
    this.newChecked = [];
    this.notChecked = true;
  }

  search(searchString: string) {
    this.searchPhrase = searchString;

    this.students = this.copyStudents.filter(
      (x) =>
        x.name.toLowerCase().includes(searchString.toLowerCase()) ||
        x.email.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}
