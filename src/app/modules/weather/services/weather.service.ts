import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '6382bcc26479515eedc5eecb7474992f';

  constructor(private http: HttpClient) {}

  getWeatherDatas(cityName: string): Observable<WeatherDatas> {
    return this.http.get<WeatherDatas>(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`
    );
  }
}
