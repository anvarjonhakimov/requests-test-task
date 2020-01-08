import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG_INJECTION_TOKEN } from '../helpers/config-injection-token';
import { Config, Task } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TasksService {

  constructor(
    @Inject(CONFIG_INJECTION_TOKEN) private _config: Config,
    private _http: HttpClient,
  ) {
  }

  getTasks(): Observable<any> {
    return this._http.get(`${this._config.apiUrl}/odata/tasks`)
      .pipe(
        map((res: {'@odata.context': string, value: Task[]}) => {
          return res.value;
        })
      );
  }

  createTask(data: any): Observable<number> {
    return this._http.post<number>(`${this._config.apiUrl}/api/${this._config.tenantguid}/Tasks`, data);
  }

  editTask(data: any): Observable<any> {
    return this._http.put(`${this._config.apiUrl}/api/${this._config.tenantguid}/Tasks`, data);
  }

  getTaskById(id: number): Observable<Task> {
    return this._http.get<Task>(`${this._config.apiUrl}/api/${this._config.tenantguid}/Tasks/${id}`);
  }
}
