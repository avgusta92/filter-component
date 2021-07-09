import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material.module";
import {SecondPageComponent} from "./second-page.component";


@NgModule({
  declarations: [
    SecondPageComponent
  ],
  imports: [],
  exports: [
    SecondPageComponent
  ]
})
export class SecondPageModule { }
