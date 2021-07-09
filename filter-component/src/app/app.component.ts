import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  sideBarState: boolean = false;

  constructor() {
  }

  onOpenSideBar() {
    this.sideBarState = true;
    this.sidenav.open();
  }

  onCloseSideBar() {
    this.sidenav.close();
    this.sideBarState = false;
  }

}
