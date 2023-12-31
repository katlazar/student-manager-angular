import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Student } from '../student';
import { Location } from '@angular/common';

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
  isStudentUpdated = false;
  studentOldName = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private location: Location
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

  save() {
    this.httpService.updateStudent(this.student).subscribe((data) => {
      this.isStudentUpdated = true;
      this.studentOldName = this.student.name;
      setTimeout(() => {
        this.isStudentUpdated = false;
      }, 4000);
    });
  }

  getBack() {
    //this.location.back();  //przekierowanie do poprzedniej strony
    this.router.navigate(['/students']);
  }
}
