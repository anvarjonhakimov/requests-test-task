import { Inject, Injectable } from '@angular/core';
import { CONFIG_INJECTION_TOKEN } from '../helpers/config-injection-token';
import { Config, User } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private _config: Config,
    private _http: HttpClient,
  ) {
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._config.apiUrl}/api/${this._config.tenantguid}/Users`);
  }
}
