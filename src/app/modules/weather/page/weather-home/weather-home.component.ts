import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { BackgroundService } from '../../services/background.service';
import { WeatherInfoComponent } from '../../components/weather-info/weather-info.component';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})

export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private intervalId: any;

  weatherDatas!: WeatherDatas;
  initialCityName = 'Nova York';
  backgroundImageUrl: string = '';

  @ViewChild(WeatherInfoComponent)
  private weatherInfoComponent!: WeatherInfoComponent;

  constructor(
    private weatherService: WeatherService,
    private background: BackgroundService
  ) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          if (error.status === 404) {
            alert('Cidade não encontrada');
          } else {
            console.error('Erro ao obter dados meteorológicos:', error);
            alert('Ocorreu um erro ao obter dados meteorológicos. Por favor, tente novamente mais tarde.');
          }
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.weatherDatas = response;
            this.backgroundImageUrl = this.background.setBackgroundImage(this.weatherDatas);
            this.weatherInfoComponent.setCurrentDateTime();
            this.weatherInfoComponent.updateCurrentDateTime();
          }
        }
      });
  }


  onFormSubmit(cityName: string): void {
    if (!cityName || cityName.trim() === '') {
      alert('Por favor, insira um nome de cidade válido');
      return;
    }

    this.initialCityName = cityName.trim();
    this.getWeatherDatas(this.initialCityName);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
