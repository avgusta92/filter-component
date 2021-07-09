import { NgModule } from '@angular/core';

import { SharedModule } from "./shared/shared.module";

import { AppComponent } from './app.component';
import { SecondPageModule } from "./pages/second-page/second-page.module";
import { HelloPageModule } from "./pages/hello-page/hello-page.module";

import { FiltersModule } from "./filters/filters.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,

    SecondPageModule,
    HelloPageModule,
    FiltersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
