import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from './requests.component';

const routes: Routes = [
  {
    path: '',
    component: RequestsComponent,
  }
];

export const RequestsRouting = RouterModule.forChild(routes);
