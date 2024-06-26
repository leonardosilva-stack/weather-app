import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherHomeComponent } from './modules/weather/page/weather-home/weather-home.component';
import { HeaderComponent } from './modules/weather/components/header/header.component';
import { FooterComponent } from './modules/weather/components/footer/footer.component';
import { WeatherInfoComponent } from './modules/weather/components/weather-info/weather-info.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherHomeComponent,
    HeaderComponent,
    FooterComponent,
    WeatherInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
