import { Component, OnInit, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { StatusService } from './status.service';
import { Status } from '../../models/status.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { flyInOut, ease, fadeInOut, easeTitleRight } from '../../util/animations/animations';
import { SCROLL_VIEW_DELAY, FADE_IN_DELAY } from '../../util/const';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers: [StatusService],
  animations: [
    flyInOut, ease, fadeInOut, easeTitleRight
  ]
})
export class StatusComponent implements OnInit {
  private modalRef: any;
  private disableInput: boolean;
  private statuses: Status[];
  public selectedStatus: Status;
  public toggle: boolean;

  @ViewChild('statusTable', {static: true}) statusTable: any;

  constructor(private statusService: StatusService, private modalService: BsModalService,
    public toastr: ToastrService) {
  }

  ngOnInit() {
    setTimeout(() => this.toggle = !this.toggle, FADE_IN_DELAY);
    this.getStatuses();
  }

  getStatuses() {
    this.disableInput = true;
    this.statusService.getStatuses()
      .then(statuses => {
        this.statuses = statuses;
        this.disableInput = false;
      }).catch(() => this.onError());
  }

  getStatus(statusId: number) {
    this.disableInput = true;
    this.statusService.getStatus(statusId)
      .then(status => {
        this.selectedStatus = status;
        this.disableInput = false;
      }).catch(() => this.onError());
  }

  deleteStatus(rowIndex: number) {
    this.statusService.deleteStatus(this.statuses[rowIndex].id)
      .then(() => {
        this.statuses.splice(rowIndex, 1);
        this.onSuccess();
      }).catch((error) => this.onError(error));
  }

  selectStatus(rowIndex: number) {
    this.selectedStatus = Object.assign({}, this.statuses[rowIndex]);
  }

  updateStatus() {
    this.statusService.updateStatus(this.selectedStatus)
      .then((updatedStatus) => {
        for (let index = 0; index < this.statuses.length; index++) {
          const element = this.statuses[index];
          if (element.id === updatedStatus.id) {
            this.statuses[index] = updatedStatus;
          }
        }
        delete this.selectedStatus;
        this.onSuccess();
      }).catch(() => this.onError());
  }

  addStatus(formValues: Status) {
    this.statusService.addStatus(formValues)
      .then(statusId => {
        formValues.id = statusId;
        this.statuses.push(formValues);
        this.modalRef.hide();
        this.onSuccess();
      }).catch(() => this.onError());
  }

  openModal(template: TemplateRef<any>) {
    // this.toastr.clearAllToasts();
    this.modalRef = this.modalService.show(template);
  }

  cancelSelection() {
    delete this.selectedStatus;
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
