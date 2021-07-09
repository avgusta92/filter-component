import { NgModule } from '@angular/core';

import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatNativeDateModule } from "@angular/material/core";

import { MaterialModule } from "./material.module";

import { LineButtonComponent } from './buttons/line-button/line-button.component';
import { InputComponent } from './input/input.component';
import { InputWithShipsComponent } from './input-with-ships/input-with-ships.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
    LineButtonComponent,
    InputComponent,
    InputWithShipsComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    MaterialModule
  ],
  exports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    MaterialModule,

    LineButtonComponent,
    InputComponent,
    InputWithShipsComponent,
    CheckboxComponent
  ],
})
export class SharedModule {}
