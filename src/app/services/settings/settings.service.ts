import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  public breakTime = 10 * 60 * 1000;

  public pomoTime = 20 * 60 * 1000;

  constructor() { }

}