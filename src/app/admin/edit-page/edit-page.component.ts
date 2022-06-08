import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DoctorService } from 'src/app/shared/doctor.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit {
  form!: FormGroup
  doctor: any
  submitted: any

  constructor(
    private docService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( (params: any) =>{
        return this.docService.getById(params['id'])
      })
    ).subscribe( doctor => {
      this.doctor = doctor;
      this.form = new FormGroup({
        uz: new FormControl(this.doctor.uz, Validators.required),
        lastname: new FormControl(this.doctor.lastname, Validators.required),
        firstname: new FormControl(this.doctor.firstname, Validators.required),
        fathername: new FormControl(this.doctor.fathername, Validators.required),
        position: new FormControl(this.doctor.position, Validators.required),
        mobile: new FormControl(this.doctor.mobile, Validators.required),
        birthDate: new FormControl(this.doctor.birthDate, Validators.required),
        conclusionContractDate: new FormControl(this.doctor.conclusionContractDate, Validators.required),
        expirationContractDate: new FormControl(this.doctor.expirationContractDate, Validators.required),
      })
    } )

  }
  submit(){
    if (this.form.invalid) {
     return
    }

    this.docService.update({
      ...this.doctor,
      uz: this.form.value.uz,
      lastname: this.form.value.lastname,
      firstname: this.form.value.firstname,
      fathername: this.form.value.fathername,
      position: this.form.value.position,
      mobile: this.form.value.mobile,
      birthDate: this.form.value.birthDate,
      conclusionContractDate: new Date(this.form.value.conclusionContractDate),
      expirationContractDate: new Date(this.form.value.expirationContractDate),
    }).subscribe(res => {
      this.form.reset()
      this.router.navigate(['admin', 'dashboard'])
    });

}
}
