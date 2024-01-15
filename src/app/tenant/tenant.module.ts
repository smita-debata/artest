import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantDashComponent } from './tenant-dash/tenant-dash.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PropertyListingComponent } from './property-listing/property-listing.component';
const route: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tenantDash' },

  {
    path: 'tenantDash', component: TenantDashComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'property' },
      { path: 'property', component: PropertyListingComponent }
    ]
  }
]

@NgModule({
  declarations: [
    TenantDashComponent,
    PropertyListingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route), MatSidenavModule, MatIconModule, MatListModule, MatButtonModule
  ],
  exports: [RouterModule]
})
export class TenantModule { }
