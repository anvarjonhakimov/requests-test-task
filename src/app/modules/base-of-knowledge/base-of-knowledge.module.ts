import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseOfKnowledgeComponent } from './base-of-knowledge.component';
import { BaseOfKnowledgeRouting } from './base-of-knowledge.routing';

@NgModule({
  declarations: [BaseOfKnowledgeComponent],
  imports: [
    CommonModule,
    BaseOfKnowledgeRouting,
  ]
})
export class BaseOfKnowledgeModule {
}
