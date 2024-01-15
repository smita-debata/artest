import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashPropertyListingComponent } from './dash-property-listing/dash-property-listing.component';
import { MapsComponent } from './maps/maps.component';
import { RentalComponent } from './rental/rental.component';
import { Chart1Component } from './chart1/chart1.component';
import { PropertyListingComponent } from './tenant/property-listing/property-listing.component';
import { PropertylistingComponent } from './propertylisting/propertylisting.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'propertyList' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'dash', component: DashboardComponent
  },
  {
    path: 'chart1', component: Chart1Component
  },
  {
    path: 'map', component: MapsComponent
  },
  { path: 'propertyList', component: PropertylistingComponent },
  { path: 'rental', component: RentalComponent },
  { path: 'dashProp', component: DashPropertyListingComponent },
  { path: 'landlord', loadChildren: () => import('./landlord/landlord.module').then(m => m.LandlordModule) },
  { path: 'tenant', loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
