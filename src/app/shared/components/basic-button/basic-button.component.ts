import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.scss']
})
export class BasicButtonComponent {

  @Input()
  label: string = "";

  @Output()
  onClick: EventEmitter<any> = new EventEmitter();
}
