import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../shared/auth.guard";
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { MatIconModule } from "@angular/material/icon";

import { AddPageComponent } from "./add-page/add-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatDialogModule} from '@angular/material/dialog';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    AddPageComponent
  ],
  entryComponents: [AddPageComponent, EditPageComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
    ScrollingModule,
    MatIconModule,
    DragDropModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
        {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]}, //! canActivate используется для защиты маршрутов (гварды)
        {path: 'doctor/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
        {path: 'add', component: AddPageComponent, canActivate: [AuthGuard]},
      ]}
    ])
  ],
  exports: [RouterModule],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}
  ]
})

export class AdminModule {}
