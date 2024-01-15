import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandlordDashComponent } from './landlord-dash/landlord-dash.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MainComponent } from './main/main.component';
import { RentlistingComponent } from './rentlisting/rentlisting.component';
import { PiechartComponent } from './charts/piechart/piechart.component';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { LinchartComponent } from './charts/linchart/linchart.component';
import { ScatterComponent } from './charts/scatter/scatter.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RentalComponent } from '../rental/rental.component';
const route: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landlord' },

  {
    path: 'landlord', component: LandlordDashComponent, children: [
      { path: '', redirectTo: 'mainland', pathMatch: 'full' },
      { path: 'mainland', component: MainComponent },
      { path: 'landlist', component: RentlistingComponent },
      { path: 'rental', component: RentalComponent },
    ]
  }
]


@NgModule({
  declarations: [
    LandlordDashComponent,
    MainComponent,
    RentlistingComponent,
    PiechartComponent,
    BarchartComponent,
    LinchartComponent,
    ScatterComponent,
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route), MatSidenavModule,
    MatIconModule, MatListModule, MatButtonModule,
    FormsModule, DropdownModule, ButtonModule
  ],
  exports: [RouterModule]
})
export class LandlordModule { }
