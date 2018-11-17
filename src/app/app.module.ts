import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorPickerModule } from 'ngx-color-picker'; 
import {WebcamModule} from 'ngx-webcam';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdunitService } from './adunit.service';
import { DataService, DataServiceOptions } from './services/index';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorPickerModule,
    WebcamModule,    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [  DataService, 
    DataServiceOptions,
    AdunitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
