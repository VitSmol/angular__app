import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mergeMap, Observable } from 'rxjs';
import { DoctorService } from '../shared/doctor.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.sass']
})


export class DoctorsComponent implements AfterViewInit, OnInit{
  currentDate = new Date()
  displayedColumns: string[] = [
    'index',
    'lastname',
    'firstname',
    'fathername',
    'uz',
    'position',
    'mobile',
    'birthDate',
    'age',
    'conclusionContractDate',
    'expirationContractDate',
  ];
  dataSource: any
  doctorsArray: any[] = [];
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private doctorServ: DoctorService
    ) {}

    ngOnInit(): void {
      this.getDoctors()
    }
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    getDoctors() {
      this.doctorServ.getAll().subscribe(doctors => {
        if (!doctors) {
          return
        } else {
          this.doctorsArray = doctors.sort((a,b) => a.expirationContractDate - b.expirationContractDate)
          console.log(this.doctorsArray);
          this.dataSource = new MatTableDataSource(this.doctorsArray)
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
        }

      })
    }

    ngAfterViewInit(): void {
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce(`Sorting cleared`)
    }
  }

  public doFilter = (input: any) => {
    this.dataSource.filter = input.value.trim().toLowerCase();
  }



  }

