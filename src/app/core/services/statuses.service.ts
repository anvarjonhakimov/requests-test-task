import { Inject, Injectable } from '@angular/core';
import { CONFIG_INJECTION_TOKEN } from '../helpers/config-injection-token';
import { Config, Status } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StatusesService {

  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private _config: Config,
    private _http: HttpClient,
  ) {
  }

  getStatuses(): Observable<Status[]> {
    return this._http.get<Status[]>(`${this._config.apiUrl}/api/${this._config.tenantguid}/Statuses`);
  }
}
