import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FbResponse } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient
  ) { }

  create(doctor: any) {
    return this.http.post(`${environment.dbUrl}/test_doctors.json`, doctor)
    .pipe(map((res: FbResponse) => {
      return {
        ...doctor,
        id: res.name,
      }
      }))
  }
  getAll(){
    const currentDate = new Date().getTime()
    return this.http.get(`${environment.dbUrl}/test_doctors.json`)
    .pipe( map((res:any) => {
      if (!res) {
        return
      }  else {
        return Object.keys(res).map(key => ({
          ...res[key],
          id: key,
          birthDate: new Date(res[key].birthDate),
          age: Math.ceil((currentDate - new Date(res[key].birthDate).getTime()) / (1000 * 3600 * 24 * 365)),
          conclusionContractDate: new Date(res[key].conclusionContractDate),
          expirationContractDate: new Date(res[key].expirationContractDate),
        }))
      }


    }) )
  }
  getById(id:any){
    const currentDate = new Date().getTime()
    return this.http.get(`${environment.dbUrl}/test_doctors/${id}.json`)
    .pipe(map((res:any) => {
      return {
        ...res,
        id,
        birthDate: new Date(res.birthDate),
        age: Math.ceil((currentDate - new Date(res.birthDate).getTime()) / (1000 * 3600 * 24 * 365)),
        conclusionContractDate: new Date(res.conclusionContractDate),
        expirationContractDate: new Date(res.expirationContractDate),
      }
    } ))
  }
  remove(id:any) {
    return this.http.delete(`${environment.dbUrl}/test_doctors/${id}.json`)
  }

  update(doctor:any) {
    return this.http.patch(`${environment.dbUrl}/test_doctors/${doctor.id}.json`, doctor)
  }
  getContractNotification() {
    return this.http.get(`${environment.dbUrl}/test_doctors.json`)
    .pipe( map ((res:any) => {
      // console.log(res);
    }))
  }
}
