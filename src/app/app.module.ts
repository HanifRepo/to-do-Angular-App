import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WholeContainerComponent } from './whole-container/whole-container.component';
import { InputComponentComponent } from './input-component/input-component.component';

import { FormsModule } from '@angular/forms';
import { ListComponentComponent } from './list-component/list-component.component'

@NgModule({
  declarations: [
    AppComponent,
    WholeContainerComponent,
    InputComponentComponent,
    ListComponentComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
