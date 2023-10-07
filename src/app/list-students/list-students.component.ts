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
    this.httpService.getStudents().subscribe((data) => {
      console.log(data);
      this.students = data;
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

  changeDisplayingMode() {
    if (this.displayingMode == DisplayingType.TABLE) {
      this.displayingMode = DisplayingType.LIST;
    } else {
      this.displayingMode = DisplayingType.TABLE;
    }
  }
}
