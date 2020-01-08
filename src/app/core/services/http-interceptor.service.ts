import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CONFIG_INJECTION_TOKEN } from '../helpers/config-injection-token';
import { Config } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private _config: Config,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      req = req.clone({
        setParams: {
          tenantguid: this._config.tenantguid
        }
      });
    }

    return next.handle(req);
  }
}
