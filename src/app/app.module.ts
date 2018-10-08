import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExcelService } from './services/excel.service';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
