import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";

import {FiltersComponent} from "./filters.component";
import {FiltersHeaderComponent} from "./components/filters-header/filters-header.component";
import {FiltersMainComponent} from "./components/filters-main/filters-main.component";

@NgModule({
  declarations: [
    FiltersComponent,
    FiltersHeaderComponent,
    FiltersMainComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FiltersHeaderComponent,
    FiltersMainComponent,
    FiltersComponent
  ]
})
export class FiltersModule { }
