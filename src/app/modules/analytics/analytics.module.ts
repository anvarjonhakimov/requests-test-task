import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRouting } from './analytics.routing';

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [
    CommonModule,
    AnalyticsRouting
  ]
})
export class AnalyticsModule {
}
