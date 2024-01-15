import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { DashPropertyListingComponent } from './dash-property-listing/dash-property-listing.component';
import { MapsComponent } from './maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RentalComponent } from './rental/rental.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ChartbarComponent } from './chartbar/chartbar.component';
import { TagModule } from 'primeng/tag';
import { PropertychartComponent } from './propertychart/propertychart.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Chart1Component } from './chart1/chart1.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { PropertylistingComponent } from './propertylisting/propertylisting.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginPageComponent,
    SignupPageComponent,
    DashPropertyListingComponent,
    MapsComponent,
    RentalComponent,
    ChartbarComponent,
    PropertychartComponent,
    Chart1Component,
    PropertylistingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatInputModule, MatIconModule, MatSelectModule, MatListModule,
    BrowserAnimationsModule, TagModule, CanvasJSAngularChartsModule,
    MatTabsModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, HttpClientModule, GoogleMapsModule, DropdownModule, ButtonModule,
    NgCircleProgressModule.forRoot(), MatStepperModule, MatButtonModule,
    MatCheckboxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
