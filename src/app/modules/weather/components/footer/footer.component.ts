import { Component, Input } from '@angular/core';
import { WeatherDatas } from 'src/app/models/interfaces/weatherDatas.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent {
  @Input() weatherDatas!: WeatherDatas;
}
