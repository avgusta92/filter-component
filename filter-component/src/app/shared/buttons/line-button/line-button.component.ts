import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-line-button',
  templateUrl: './line-button.component.html',
  styleUrls: ['./line-button.component.scss']
})
export class LineButtonComponent implements OnInit {
  @Input() buttonText!: string;
  @Input() buttonColor: string = 'gray';

  constructor() { }

  ngOnInit(): void {
  }

}
