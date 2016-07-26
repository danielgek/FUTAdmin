/* tslint:disable:no-string-literal */

import {Pessoa} from '../pessoa';
import {Pagamento} from '../pagamentos/pagamento';
import {ResponsibleAdult} from './responsibleAdult';

export interface IAluno {
    $key?: string;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    contact: string;
    city: string;
    district: string;
    postalCode: string;
    responsibleAdult: ResponsibleAdult;
    pagamentos: Pagamento[];
}

export class Aluno extends Pessoa implements IAluno {

    public responsibleAdult: ResponsibleAdult;
    public pagamentos: Pagamento[];

    constructor(firstName?: string, lastName?: string, address?: string, email?: string,
        contact?: string, city?: string, district?: string, postalCode?: string) {
            super(firstName, lastName, address, email, contact, city, district, postalCode);
    }
}
