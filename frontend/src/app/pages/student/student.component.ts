import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../../models/student.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { flyInOut, ease, fadeInOut, easeTitleRight } from '../../util/animations/animations';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../department/department.service';
import { Status } from '../../models/status.model';
import { StatusService } from '../status/status.service';
import { FADE_IN_DELAY } from '../../util/const';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService, DepartmentService, StatusService],
  animations: [
    flyInOut, ease, fadeInOut, easeTitleRight
  ],
  encapsulation: ViewEncapsulation.None
})
export class StudentComponent implements OnInit {
  private modalRef: any;
  private disableInput: boolean;
  private students: Student[];
  private departments: Department[];
  private statuses: Status[];
  public selectedStudent: Student;
  public toggle: boolean;

  @ViewChild('studentTable', { static: true }) table;

  constructor(private studentService: StudentService, private modalService: BsModalService,
    public toastr: ToastrService, private departmentService: DepartmentService, private statusService: StatusService) {
  }

  ngOnInit() {
    setTimeout(() => this.toggle = !this.toggle, FADE_IN_DELAY);
    this.getStudents();
    this.getDepartments();
    this.getStatuses();
  }

  getStudents() {
    this.disableInput = true;
    this.studentService.getStudents()
      .then(students => {
        this.students = students;
        this.disableInput = false;
      }).catch(() => this.onError());
  }

  getDepartments() {
    this.departmentService.getDepartments()
      .then(departments => {
        this.departments = departments;
      }).catch(() => this.onError());
  }

  getStatuses() {
    this.statusService.getStatuses()
      .then(statuses => {
        this.statuses = statuses;
      }).catch(() => this.onError());
  }

  getStudent(studentId: number) {
    this.disableInput = true;
    this.studentService.getStudent(studentId)
      .then(student => {
        this.selectedStudent = student;
        this.disableInput = false;
      }).catch(() => this.onError());
  }

  deleteStudent(rowIndex: number) {
    this.studentService.deleteStudent(this.students[rowIndex].id)
      .then(() => {
        this.students.splice(rowIndex, 1);
        this.onSuccess();
      }).catch(() => this.onError());
  }

  selectStudent(rowIndex: number, template) {
    this.selectedStudent = Object.assign({}, this.students[rowIndex]);
    this.modalRef = this.modalService.show(template);
  }

  submitStudentForm() {
    if (this.selectedStudent.id == null) {
      this.addStudent();
    } else {
      this.updateStudent();
    }
  }

  updateStudent() {
    this.studentService.updateStudent(this.selectedStudent)
      .then((updatedStudent) => {
        for (let index = 0; index < this.students.length; index++) {
          if (this.students[index].id === updatedStudent.id) {
            this.students[index] = updatedStudent;
          }
        }
        this.selectedStudent = new Student();
        this.modalRef.hide();
        this.onSuccess();
      }).catch(() => this.onError());
  }

  addStudent() {
    this.studentService.addStudent(this.selectedStudent)
      .then(student => {
        this.selectedStudent = new Student();
        this.students.push(student);
        this.modalRef.hide();
        this.onSuccess();
      }).catch(() => this.onError());
  }

  openModal(template: TemplateRef<any>) {
    this.selectedStudent = new Student();
    this.modalRef = this.modalService.show(template);
  }

  cancelSelection() {
    delete this.selectedStudent;
  }

  onError() {
    this.toastr.error('Something went wrong !');
  }

  onSuccess() {
    this.toastr.success('Operation successful !');
  }

  equals(o1, o2): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return false;
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
