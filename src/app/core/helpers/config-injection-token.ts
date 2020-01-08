import { InjectionToken } from '@angular/core';
import { Config } from '../interfaces';

export const CONFIG_INJECTION_TOKEN = new InjectionToken<Config>('config');
