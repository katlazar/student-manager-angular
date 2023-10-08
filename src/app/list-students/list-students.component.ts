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
  studentIdToRemove: number[] = [];
  displayingMode: DisplayingType = DisplayingType.TABLE;
  DisplayingType = DisplayingType;
  copyStudents: Student[] = [];
  searchPhrase = '';
  darkTableMode = 'table-dark';
  isDarkMode = false;
  tableMode = '';

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
  }

  getData() {
    this.studentIdToRemove = [];
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
    //alert('Kliknięto usuwanie studenta o id =' + id);
    this.httpService.deleteStudent(id).subscribe(() => {
      //alert('Usunięto dane');
      this.students = this.students.filter((x) => x.id != id);
    });
  }

  changeStatus(event: any, studentId: number) {
    console.log(event.checked);
    if (event.checked) {
      this.studentIdToRemove.push(studentId);
    } else {
      this.studentIdToRemove = this.studentIdToRemove.filter(
        (x) => x != studentId
      );
    }

    console.log(this.studentIdToRemove);
  }

  deleteGlobalStudents() {
    this.studentIdToRemove.forEach((x) => {
      this.httpService.deleteStudent(x).subscribe(() => {
        console.log('Usunięto studenta o id ' + x);
        this.students = this.students.filter((d) => d.id != x);
      });
    });
  }

  changeDisplayingMode() {
    if (this.displayingMode == DisplayingType.TABLE) {
      this.displayingMode = DisplayingType.LIST;
    } else {
      this.displayingMode = DisplayingType.TABLE;
    }
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
