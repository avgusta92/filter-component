import { NgModule } from '@angular/core';
import {HelloPageComponent} from "./hello-page.component";
import {CardComponent} from "./card/card.component";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    HelloPageComponent,
    CardComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CardComponent
  ]
})
export class HelloPageModule { }
