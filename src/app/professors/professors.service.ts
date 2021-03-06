import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { IProfessor, Professor } from './professor';
import { DatePipe } from '@angular/common';


@Injectable()
export class ProfessorsService {

  professors: FirebaseListObservable<IProfessor[]>;
  constructor(public af: AngularFire) {
    this.professors = this.af.database.list('professors');
  }

  getProfessors(): FirebaseListObservable<IProfessor[]> {
    return this.professors;
  }

  addProfessor(professor: Professor) {
    var datePipe = new DatePipe('pt-PT');
    professor.entryDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.professors.push(professor);
  }

  editProfessor(professorObservable: FirebaseObjectObservable<IProfessor>, professor: Professor) {
    return professorObservable.update({
      address: professor.address,
      city: professor.city,
      contact: professor.contact,
      email: professor.email,
      firstName: professor.firstName,
      lastName: professor.lastName,
      postalCode: professor.postalCode,
      socioNumber: professor.socioNumber,
      entryDate: professor.entryDate,
      birthdayDate: professor.birthdayDate,
      canGive: professor.canGive,
      rewarnPerHour: professor.rewarnPerHour,
      counterHours: professor.counterHours,
      paymentPerMonth: professor.paymentPerMonth,

    });
  }

  getProfessor(id: number | string): FirebaseObjectObservable<IProfessor>
  {
      return this.af.database.object('professors/' + id);
  }

  deleteProfessor(key: string)
  {
    this.af.database.object('professors/' + key).remove();
  }

   filter(term: string) {
    return this.professors.map(professors =>
       professors.filter(professor => {
          return professor.firstName.indexOf(term) >= 0 ? true : false;
        }
      )
    );
  }

  getProfessorsByType(type: number) {
    return this.professors.map(professors =>
       professors.filter(professor => {
          if (professor.canGive !== undefined) {
            return professor.canGive[type];
          }
        }
      )
    );
  }

  getProfessorsFrom(discipline: string) {
    let pos = this.convertToPositionArrayCanGive(discipline);
    return this.professors.map(professors =>
       professors.filter(professor => {
            return professor.canGive[pos];
          }
      )
    );
  }

  convertToPositionArrayCanGive(disc: string) {
    if (disc === 'inst') {
      return 0;
    } else if (disc === 'fm') {
      return 1;
    } else if (disc === 'solf') {
      return 2;
    } else if (disc === 'cc') {
      return 3;
    }
  }

}
