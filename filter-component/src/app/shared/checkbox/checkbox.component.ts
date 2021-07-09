import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() typeValue: string = 'Checkbox text';
  @Input() sumOfThisType: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
