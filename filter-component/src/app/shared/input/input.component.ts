import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() labelValue: string = 'Label';
  @Input() placeholderValue: string = 'Placeholder';
  @Input() inputIcon?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
