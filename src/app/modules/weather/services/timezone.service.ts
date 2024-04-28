import { Injectable } from '@angular/core';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  constructor() { }

  getTimezoneOffsetFromWeatherData(weatherDatas: WeatherDatas): number {
    const offsetSeconds = weatherDatas.timezone;
    const offsetHours = Math.floor(offsetSeconds / 3600);
    const offsetMinutes = Math.floor((offsetSeconds % 3600) / 60);

    return offsetHours + (offsetMinutes / 60);
  }
}
