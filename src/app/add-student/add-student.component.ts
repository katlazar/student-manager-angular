import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Student } from '../student';
import { delay } from 'rxjs';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  isFormValid = true;
  errorText: string[] = [];
  isFormSubmitting = false;
  isAddedSuccessful = false;
  isAddedError = false;
  messageDisplayingTimeMs = 5000;

  constructor(private httpService: HttpService) {}

  isValidate(studentName: string, email: string): boolean {
    let isFormValid = true;

    if (studentName.length == 0) {
      isFormValid = false;
      this.errorText.push('Nazwa studenta jest wymagana');
    }

    if (studentName.length > 10) {
      isFormValid = false;
      this.errorText.push('Nazwa studenta musi mieć długość mniejszą od 10');
    }

    if (email.includes('@') == false) {
      isFormValid = false;
      this.errorText.push('Email jest niepoprawny');
    }

    return isFormValid;
  }

  save(studentName: string, email: string) {
    console.log('student:' + studentName + ', email:' + email);
    this.isFormValid = true;
    this.errorText = [];

    this.isFormValid = this.isValidate(studentName, email);

    if (this.isFormValid) {
      this.isFormSubmitting = true;
      setTimeout(() => {
        this.httpService
          .addStudent({ name: studentName, email } as Student)
          .pipe(delay(500))
          .subscribe({
            next: (data) => {
              this.isFormSubmitting = false;
              this.isAddedSuccessful = true;
              setTimeout(() => {
                this.isAddedSuccessful = false;
              }, this.messageDisplayingTimeMs);
            },
            error: () => {
              this.isFormSubmitting = false;
              this.isAddedError = true;
            },
          });
      }, 1000);
    }

    return false;
  }
}
