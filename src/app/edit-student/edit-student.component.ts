import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Student } from '../student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent {
  // 1. Wydobyć id z adresu URL
  // 2. Utworzyć metodę w HttpService do pobrania danych o konkretnym studencie
  // 3. Stworzyć metodę pobierającą dane z bazy i wyświetlić w formularzu
  // 4. Zbudować formularz
  // 5. Stworzyć metodę zapisującą nowe dane w bazie
  student!: Student;
  studentOldName = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.getIdFromUrl();
  }

  getIdFromUrl() {
    this.activatedRoute.params.subscribe((param) => {
      let id = param['id'];
      console.log(id);
      this.httpService.getStudent(id).subscribe((data) => {
        this.student = data;
        this.studentOldName = this.student.name;
        console.log(this.student);
      });
    });
  }

  save() {}
}
