import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TabsComponent } from './util/tabs/tabs.component';
import { StatusComponent } from './pages/status/status.component';
import { StudentComponent } from './pages/student/student.component';
import { DepartmentComponent } from './pages/department/department.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms/';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxResizeWatcherDirective } from './util/directives/ngx-resize-watcher.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TitleComponent } from './util/title/title.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

export const appRoutes: Routes = [
  { path: 'status', component: StatusComponent },
  { path: 'student', component: StudentComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: '', redirectTo: '/student', pathMatch: 'full' },
  { path: '**', redirectTo: '/student' }
];

@NgModule({
  declarations: [
    AppComponent, TabsComponent, StatusComponent,
    StudentComponent, DepartmentComponent, FacultyComponent, NgxResizeWatcherDirective, TitleComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, BrowserAnimationsModule,
    FormsModule, NgxDatatableModule, AngularSvgIconModule, ModalModule.forRoot(),
    CollapseModule.forRoot(), ToastrModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
