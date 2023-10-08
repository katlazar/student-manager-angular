import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'index.html', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'add', component: AddStudentComponent },
  { path: 'students', component: ListStudentsComponent },
  { path: 'edit/:id', component: EditStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
