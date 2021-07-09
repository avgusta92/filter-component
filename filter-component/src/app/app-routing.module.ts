import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloPageComponent } from "./pages/hello-page/hello-page.component";
import {SecondPageComponent} from "./pages/second-page/second-page.component";

const routes: Routes = [
  { path: '',   redirectTo: '/hello-pageFirs', pathMatch: 'full' },
  { path: 'hello-page', component: HelloPageComponent },
  { path: 'second-page', component: SecondPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
