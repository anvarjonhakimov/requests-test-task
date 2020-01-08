import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { ClientsRouting } from './clients.routing';

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRouting,
  ]
})
export class ClientsModule {
}
