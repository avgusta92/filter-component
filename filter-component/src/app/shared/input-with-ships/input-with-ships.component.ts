import {Component, Input, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

export interface SelectedChips {
  name: string;
}

@Component({
  selector: 'app-input-with-ships',
  templateUrl: './input-with-ships.component.html',
  styleUrls: ['./input-with-ships.component.scss']
})
export class InputWithShipsComponent implements OnInit {
  @Input() labelValue: string = 'Label';
  @Input() placeholderValue: string = 'Placeholder';
  @Input() inputIcon?: string;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  selectedChips: SelectedChips[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedChips.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: SelectedChips): void {
    const index = this.selectedChips.indexOf(fruit);

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    }
  }
}
