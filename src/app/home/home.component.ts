import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../students/students.service';
import { ProfessorsService } from '../professors/professors.service';
import { ClassesService } from '../disciplines/classes/classes.service';
import { IClassT } from '../disciplines/classes/class';

import { Observable } from 'rxjs';
import { IStudent } from '../students/student';
import { IProfessor} from '../professors/professor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [StudentsService, ProfessorsService, ClassesService],

})
export class HomeComponent implements OnInit, OnDestroy {
  /*home (alunos: n.total n.por disciplinas) 
  professores n.profesores despesa por mes, 
  turmas por disciplina, 
  pagamentos de alunos em atraso
  */

  tiles: any[] = [
    { _cols: 1, _rows: 1, subject: 'Alunos', data : {}},
    { _cols: 1, _rows: 1, subject: 'Professores', data : {}},
    { _cols: 1, _rows: 1, subject: 'Turmas', data : {}},
    { _cols: 1, _rows: 1, subject: 'Pagamentos', data : {}},
  ];

  students: Observable<IStudent[]>;
  constructor(public router: Router, public cs: ClassesService, public ss: StudentsService, public ps: ProfessorsService) {}

  ngOnInit() {
    //tile 0
    /*this.ss.getStudents().map(list => list.length).subscribe(lenght =>  this.tiles[0].data['numTotal'] = lenght);
    this.ss.getStudentsFrom('inst').map(list => list.length).subscribe(lenght =>  this.tiles[0].data['numInst'] = lenght);
    this.ss.getStudentsFrom('fm').map(list => list.length).subscribe(lenght =>  this.tiles[0].data['numFm'] = lenght);
    this.ss.getStudentsFrom('solf').map(list => list.length).subscribe(lenght =>  this.tiles[0].data['numSolf'] = lenght);
    this.ss.getStudentsFrom('cc').map(list => list.length).subscribe(lenght =>  this.tiles[0].data['numCc'] = lenght);
*/
    //tile 1 
    /*this.ps.getProfessors().map(list => list.length).subscribe(lenght =>  this.tiles[1].data['numTotal'] = lenght);
    this.ps.getProfessorsFrom('inst').map(list => list.length).subscribe(lenght =>  this.tiles[1].data['numInst'] = lenght);
    this.ps.getProfessorsFrom('fm').map(list => list.length).subscribe(lenght =>  this.tiles[1].data['numFm'] = lenght);
    this.ps.getProfessorsFrom('solf').map(list => list.length).subscribe(lenght =>  this.tiles[1].data['numSolf'] = lenght);
    this.ps.getProfessorsFrom('cc').map(list => list.length).subscribe(lenght =>  this.tiles[1].data['numCc'] = lenght);
    this.ps.getProfessors().map(list => list).subscribe(list => this.tiles[1].data['mediaPayments'] = this.getMedium(list));
    */
    //this.ps.getProfessors().map(list => list).subscribe(list => this.tiles[1].data['totalPayments'] = this.getTotalPayments(list));

    //tile 2
    this.tiles[2].data['numTotal'] = 0;
    this.cs.getClasses('inst').map(list => list.length).subscribe(length => {
      this.tiles[2].data['numInst'] = Number(length);
      this.tiles[2].data['numTotal'] += Number(length);
    });
    this.cs.getClasses('fm').map(list => list.length).subscribe(length => {
      this.tiles[2].data['numFm'] = Number(length);
      this.tiles[2].data['numTotal'] += Number(length);
    });

    this.cs.getClasses('solf').map(list => list.length).subscribe(length => {
      this.tiles[2].data['numSolf'] = Number(length);
      this.tiles[2].data['numTotal'] += Number(length);
    });
    this.cs.getClasses('cc').map(list => list.length).subscribe(length => {
      this.tiles[2].data['numCc'] = Number(length);
      this.tiles[2].data['numTotal'] += Number(length);
    });

    this.cs.getClasses('inst').map(list => list).subscribe(list => this.tiles[2].data['mediaNumStudentsPerClassInst'] =
      this.getMediumStudents(list));
    this.cs.getClasses('fm').map(list => list).subscribe(list => this.tiles[2].data['mediaNumStudentsPerClassFm'] =
      this.getMediumStudents(list));
    this.cs.getClasses('solf').map(list => list).subscribe(list => this.tiles[2].data['mediaNumStudentsPerClassSolf'] =
      this.getMediumStudents(list));
    this.cs.getClasses('cc').map(list => list).subscribe(list => this.tiles[2].data['mediaNumStudentsPerClassCc'] =
      this.getMediumStudents(list));

    //tile 3
    this.tiles[3].data['students'] = [];
    this.tiles[3].data['numTotal'] = 0;

    this.ss.getStudents().map(students => students).subscribe(students => {
      for (let i = 0; i < students.length; i++) {
        let num = this.checkPayments(students[i]);
        if (num > 0) {
          this.tiles[3].data['numTotal'] += num;
          this.tiles[3].data['students'].push({
            firstName: students[i].firstName,
            lastName: students[i].lastName,
            inLate: num
          });
        }
      }
    });
}

  ngOnDestroy(){

  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  getMedium(list: IProfessor[]): number {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      sum += Number(list[i].rewarnPerHour);
    }
    return sum / list.length;
  }

  getTotalPayments(list: IProfessor[]): number {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      sum += Number(list[i].paymentPerMonth);
    }
    return sum;
  }

  getMediumStudents(list: IClassT[]): number {
    let numStudents = 0;
    for (let i = 0; i < list.length; i++) {
      numStudents += Number(list[i].numberStudents);
    }

    return numStudents / list.length;
  }

  checkPayments(student: IStudent): number {

    if (student.payments === undefined) {
      return 0;
    }

    let result = 0;
    let date = new Date();
    let payments = student.payments;
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].year < date.getFullYear() && !payments[i].done) {
        result++;
      } else if (payments[i].year === date.getFullYear() && !payments[i].done && payments[i].month < date.getMonth()+2) {
        result++;
      } else if (payments[i].year < date.getFullYear() && !payments[i].done) {
        result++;
      }
    }

    return result;
  }

}
