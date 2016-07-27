import { RouterConfig } from '@angular/router';
import { DisciplinesCenter } from './disciplines-center.component';
import { ListDisciplinesComponent } from './list';
import { ListClassesComponent } from './classes/list';
import { AuthGuardService }             from '../auth-guard.service';

export const disciplinesRoutes: RouterConfig = [
  {
    path: 'disciplines',
    component: DisciplinesCenter,
    canActivate: [AuthGuardService],
    children: [
        {
            path: ':type',
            component: ListClassesComponent,
            canActivate: [AuthGuardService]
        },
        {
            path: '',
            component: ListDisciplinesComponent,
            canActivate: [AuthGuardService]
        },
    ]
  }
];