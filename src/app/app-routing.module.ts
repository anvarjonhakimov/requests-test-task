import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'requests',
    pathMatch: 'full'
  },
  {
    path: 'base-of-knowledge',
    loadChildren: './modules/base-of-knowledge/base-of-knowledge.module#BaseOfKnowledgeModule'
  },
  {
    path: 'requests',
    loadChildren: './modules/requests/requests.module#RequestsModule'
  },
  {
    path: 'employees',
    loadChildren: './modules/employees/employees.module#EmployeesModule'
  },
  {
    path: 'clients',
    loadChildren: './modules/clients/clients.module#ClientsModule'
  },
  {
    path: 'analytics',
    loadChildren: './modules/analytics/analytics.module#AnalyticsModule'
  },
  {
    path: 'settings',
    loadChildren: './modules/settings/settings.module#SettingsModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
