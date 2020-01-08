import { RouterModule, Routes } from '@angular/router';
import { BaseOfKnowledgeComponent } from './base-of-knowledge.component';

const routes: Routes = [
  {
    path: '',
    component: BaseOfKnowledgeComponent
  }
];

export const BaseOfKnowledgeRouting = RouterModule.forChild(routes);
