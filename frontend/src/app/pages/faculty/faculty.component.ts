import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FacultyService } from './faculty.service';
import { Faculty } from '../../models/faculty.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { flyInOut, ease, fadeInOut, easeTitleRight } from '../../util/animations/animations';
import { SCROLL_VIEW_DELAY, FADE_IN_DELAY } from '../../util/const';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
  providers: [FacultyService],
  animations: [
    flyInOut, ease, fadeInOut, easeTitleRight
  ]
})
export class FacultyComponent implements OnInit {
  private modalRef: any;
  private shouldDisableInput: boolean;
  private faculties: Faculty[];
  public selectedFaculty: Faculty;
  public toggle: boolean;

  constructor(private facultyService: FacultyService, private modalService: BsModalService,
    public toastr: ToastrService, vcr: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    setTimeout(() => this.toggle = !this.toggle, FADE_IN_DELAY);
    this.getFacultyes();
  }

  getFacultyes() {
    this.shouldDisableInput = true;
    this.facultyService.getFaculties()
      .then(faculties => {
        this.faculties = faculties;
        this.shouldDisableInput = false;
      }).catch(() => this.onError());
  }

  getFaculty(facultyId: number) {
    this.shouldDisableInput = true;
    this.facultyService.getFaculty(facultyId)
      .then(faculty => {
        this.selectedFaculty = faculty;
        this.shouldDisableInput = false;
      }).catch(() => this.onError());
  }

  deleteFaculty(rowIndex: number) {
    this.facultyService.deleteFaculty(this.faculties[rowIndex].id)
      .then(() => {
        this.faculties.splice(rowIndex, 1);
        this.onSuccess();
      }).catch((error) => this.onError(error));
  }

  selectFaculty(rowIndex: number) {
    this.selectedFaculty = Object.assign({}, this.faculties[rowIndex]);
  }

  updateFaculty() {
    this.facultyService.updateFaculty(this.selectedFaculty)
      .then((updatedFaculty) => {
        for (let index = 0; index < this.faculties.length; index++) {
          if (this.faculties[index].id === updatedFaculty.id) {
            this.faculties[index] = updatedFaculty;
          }
        }
        delete this.selectedFaculty;
        this.onSuccess();
      }).catch(() => this.onError());
  }

  addFaculty(formValues: Faculty) {
    this.facultyService.addFaculty(formValues)
      .then(facultyId => {
        formValues.id = facultyId;
        this.faculties.push(formValues);
        this.modalRef.hide();
        this.onSuccess();
      }).catch(() => this.onError());
  }

  openModal(template: TemplateRef<any>) {
    // this.toastr.clearAllToasts();
    this.modalRef = this.modalService.show(template);
  }

  cancelSelection() {
    delete this.selectedFaculty;
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
