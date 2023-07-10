import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.scss']
})
export class BasicButtonComponent {

  @Input()
  label: string = "";

  @Input()
  onClick: Function = () => {};
}
