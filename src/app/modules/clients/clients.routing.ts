import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
  }
];

export const ClientsRouting = RouterModule.forChild(routes);
