import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';
import { Subject, takeUntil } from 'rxjs';
import { faLocationPin, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})

export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private intervalId: any;


  pinIcon = faLocationPin;

  backgroundImageUrl: string = 'url("../../../../../assets/bg/sunny-beach.jpg")';

  initialCityName = 'Santos';
  country = 'BR';
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass;
  currentDateTime: string = '';
  currentWeekday: string = '';
  currentDay: string = '';
  currentMonth: string = '';
  currentYear: string = '';
  currentHourMinute: string = '';

  constructor(
    private weatherService: WeatherService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  setCurrentDateTime(): void {
    const date = new Date();

    if (this.weatherDatas) {
      const timezoneOffset = this.getTimezoneOffset();

      date.setHours(date.getHours() + timezoneOffset);
      date.setHours(date.getHours() + 3);
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);


    const [datePart, timePart] = formattedDate.split(' às ');


    const [hour, minute] = timePart.split(':');

    this.currentDateTime = formattedDate;
    this.currentWeekday = datePart.split(' ')[0].replace(',', '');
    this.currentDay = datePart.split(' ')[1];
    this.currentMonth = datePart.split(' ')[2];
    this.currentYear = datePart.split(' ')[3];
    this.currentHourMinute = `${hour}:${minute}`;

    this.cdRef.detectChanges();
  }

  getTimezoneOffset(): number {
    const offsetSeconds = this.weatherDatas.timezone;
    const offsetHours = Math.floor(offsetSeconds / 3600);
    const offsetMinutes = Math.floor((offsetSeconds % 3600) / 60);

    return offsetHours + (offsetMinutes / 60);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.weatherDatas = response;
            this.setBackgroundImage();
            this.setCurrentDateTime();
            this.updateCurrentDateTime();
          }
        },
        error: (error) => console.log(error),
      });
  }

  setBackgroundImage(): void {
    const weatherDescription = this.weatherDatas.weather[0].main.toLowerCase();
    const date = new Date();
    const currentHour = date.getUTCHours() + this.getTimezoneOffset(); // Adiciona o offset do fuso horário

    let backgroundImagePath = '';

    console.log(currentHour);

    if (currentHour >= 6 && currentHour < 18) {
      switch (weatherDescription) {
        case 'clear':
          backgroundImagePath = '../../../../../assets/bg/day-clear-sky.jpg';
          break;
        case 'clouds':
          backgroundImagePath = '../../../../../assets/bg/day-cloudy-sky.jpg';
          break;
        case 'rain':
          backgroundImagePath = '../../../../../assets/bg/day-rainy.jpg';
          break;
        case 'snow':
          backgroundImagePath = '../../../../../assets/bg/day-snowy-mountains.jpg';
          break;
        default:
          backgroundImagePath = '../../../../../assets/bg/sunny-beach.jpg';
          break;
      }
    } else {
      switch (weatherDescription) {
        case 'clear':
          backgroundImagePath = '../../../../../assets/bg/night-clear-sky.jpg';
          break;
        case 'clouds':
          backgroundImagePath = '../../../../../assets/bg/night-cloudy-sky.jpg';
          break;
        case 'rain':
          backgroundImagePath = '../../../../../assets/bg/night-rainy.jpg';
          break;
        case 'snow':
          backgroundImagePath = '../../../../../assets/bg/night-snow.jpg';
          break;
        default:
          backgroundImagePath = '../../../../../assets/bg/sunny-beach.jpg';
          break;
      }
    }

    this.backgroundImageUrl = `url("${backgroundImagePath}")`;
  }


  updateCurrentDateTime(): void {
    this.setCurrentDateTime();
    this.intervalId = setInterval(() => {
      this.setCurrentDateTime();

    }, 60000);
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }


  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
