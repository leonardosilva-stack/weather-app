
import { Injectable } from '@angular/core';
import { TimezoneService } from './timezone.service';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  constructor(private timezoneService: TimezoneService) {}

  setBackgroundImage(weatherDatas: WeatherDatas): string {
    const weatherDescription = weatherDatas.weather[0].main.toLowerCase();
    const date = new Date();
    const currentHour = date.getUTCHours() + this.timezoneService.getTimezoneOffsetFromWeatherData(weatherDatas);
    console.log(weatherDescription)

    const isDaytime = currentHour >= 6 && currentHour < 18;

    const weatherImages = {
      clear: isDaytime ? 'day-clear-sky.jpg' : 'night-clear-sky.jpg',
      clouds: isDaytime ? 'day-cloudy-sky.jpg' : 'night-cloudy-sky.jpg',
      rain: isDaytime ? 'day-rainy.jpg' : 'night-rainy.jpg',
      snow: isDaytime ? 'day-snowy-mountains.jpg' : 'night-snow.jpg',
      default: 'sunny-beach.jpg'
    };

    const backgroundImagePath = weatherImages[weatherDescription as keyof typeof weatherImages] || weatherImages.default;

    return `url("../../../../../assets/bg/${backgroundImagePath}")`;
  }

}
