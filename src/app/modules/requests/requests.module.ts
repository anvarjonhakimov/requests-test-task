import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestsRouting } from './requests.routing';
import { EllipsisPipe } from '../../core/pipes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RequestsComponent,
    EllipsisPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RequestsRouting,
  ]
})
export class RequestsModule {
}
