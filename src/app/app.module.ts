import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import Ru from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { CONFIG_INJECTION_TOKEN } from './core/helpers/config-injection-token';
import { CONFIG } from './config';
import { HttpInterceptorService, StatusesService, TasksService, UsersService } from './core/services';

registerLocaleData(Ru);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    TasksService,
    StatusesService,
    UsersService,
    {
      provide: CONFIG_INJECTION_TOKEN,
      useValue: CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
