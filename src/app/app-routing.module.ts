import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { AdminModule } from './admin/admin.module'

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: DoctorsComponent},
    {path: 'doctor/:id', component: DoctorComponent},
  ]},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
