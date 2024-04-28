import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faLocationPin, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {
  @Input() cityName: string = '';
  @Input() countryCode: string = '';
  @Output() formSubmitted: EventEmitter<string> = new EventEmitter<string>();
  pinIcon = faLocationPin;
  searchIcon = faMagnifyingGlass;

  onSubmit(form: NgForm): void {
    this.formSubmitted.emit(form.value.city);
  }
}
