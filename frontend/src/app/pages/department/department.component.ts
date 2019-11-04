import { Component, OnInit, TemplateRef } from '@angular/core';
import { DepartmentService } from './department.service';
import { Department } from '../../models/department.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { flyInOut, ease, fadeInOut, easeTitleRight } from '../../util/animations/animations';
import { Faculty } from '../../models/faculty.model';
import { FacultyService } from '../faculty/faculty.service';
import { SCROLL_VIEW_DELAY, FADE_IN_DELAY } from '../../util/const';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentService, FacultyService],
  animations: [
    flyInOut, ease, fadeInOut, easeTitleRight
  ]
})
export class DepartmentComponent implements OnInit {
  private modalRef: any;
  private disableInput: boolean;
  private departments: Department[];
  private faculties: Faculty[];
  public selectedDepartment: Department;
  public toggle: boolean;

  constructor(private departmentService: DepartmentService, private modalService: BsModalService,
    public toastr: ToastrService, private facultyService: FacultyService ) {
     }

  ngOnInit() {
    setTimeout(() => this.toggle = !this.toggle, FADE_IN_DELAY);
    this.getDepartments();
    this.getFaculties();
  }

  getDepartments() {
    this.disableInput = true;
    this.departmentService.getDepartments()
      .then(departments => {
        this.departments = departments;
        this.disableInput = false;
      }).catch(() => this.onError());
  }

  getFaculties() {
    this.facultyService.getFaculties()
      .then(faculties => {
        this.faculties = faculties;
      }).catch(() => this.onError());
  }

  getDepartment(departmentId: number) {
    this.disableInput = true;
    this.departmentService.getDepartment(departmentId)
      .then(department => {
        this.selectedDepartment = department;
        this.disableInput = false;
      }).catch(() => this.onError());
  }

  deleteDepartment(rowIndex: number) {
    this.departmentService.deleteDepartment(this.departments[rowIndex].id)
      .then(() => {
        this.departments.splice(rowIndex, 1);
        this.onSuccess();
      }).catch((error) => this.onError(error));
  }

  selectDepartment(rowIndex: number) {
    this.selectedDepartment = Object.assign({}, this.departments[rowIndex]);
  }

  updateDepartment() {
    this.departmentService.updateDepartment(this.selectedDepartment)
      .then((updatedDepartment) => {
        for (let index = 0; index < this.departments.length; index++) {
          if (this.departments[index].id === updatedDepartment.id) {
            this.departments[index] = updatedDepartment;
          }
        }
        delete this.selectedDepartment;
        this.onSuccess();
      }).catch(() => this.onError());
  }

  addDepartment(formValues: Department) {
    this.departmentService.addDepartment(formValues)
      .then(departmentId => {
        formValues.id = departmentId;
        this.departments.push(formValues);
        this.modalRef.hide();
        this.onSuccess();
      }).catch(() => this.onError());
  }

  openModal(template: TemplateRef<any>) {
    // this.toastr.clearAllToasts();
    this.modalRef = this.modalService.show(template);
  }

  cancelSelection() {
    delete this.selectedDepartment;
  }

  scroll() {
    setTimeout(() => {
      document.getElementById('formContainer').scrollIntoView();
    }, SCROLL_VIEW_DELAY);
  }

  onError(error?: Response) {
    switch (error.status) {
      // INTEGRITY VIOLATION
      case 409:
        this.toastr.warning('Delete the connected the entities first !');
        break;
      default:
        this.toastr.error('Something went wrong !');
        break;
    }
  }

  onSuccess() {
    this.toastr.success('Operation successful !');
  }

}
