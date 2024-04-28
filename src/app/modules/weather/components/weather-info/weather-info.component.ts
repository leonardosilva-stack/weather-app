import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';
import { ChangeDetectorRef } from '@angular/core';
import { TimezoneService } from '../../services/timezone.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: []
})
export class WeatherInfoComponent implements OnInit, OnDestroy, OnChanges  {
  private intervalId: any;
  @Input() weatherDatas!: WeatherDatas;
  currentWeekday: string = '';
  currentHourMinuteSecond: string = '';
  currentHourMinute: string = '';
  currentDateTime: string = '';
  currentDay: string = '';
  currentMonth: string = '';
  currentYear: string = '';

  constructor(private cdRef: ChangeDetectorRef, private timezoneService: TimezoneService) {}

  ngOnInit(): void {
    this.setCurrentDateTime();
  }

  ngOnChanges(): void {
    if (this.weatherDatas) {
      this.setCurrentDateTime();
      this.updateCurrentDateTime();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  setCurrentDateTime(): void {
    const date = new Date();

    if (this.weatherDatas) {
      const timezoneOffset = this.timezoneService.getTimezoneOffsetFromWeatherData(this.weatherDatas);
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
      second: '2-digit',
      hour12: false
    };

    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);

    const [datePart, timePart] = formattedDate.split(' às ');
    const [hour, minute, second] = timePart.split(':');

    this.currentDateTime = formattedDate;
    this.currentWeekday = datePart.split(' ')[0].replace(',', '');
    this.currentDay = datePart.split(' ')[1];
    this.currentMonth = datePart.split(' ')[2];
    this.currentYear = datePart.split(' ')[3];
    this.currentHourMinuteSecond = `${hour}:${minute}:${second}`;

    this.cdRef.detectChanges();
  }

  updateCurrentDateTime(): void {
    this.intervalId = setInterval(() => {
      this.setCurrentDateTime();
    }, 1000);
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
}
