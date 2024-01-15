import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant-dash',
  templateUrl: './tenant-dash.component.html',
  styleUrls: ['./tenant-dash.component.css']
})
export class TenantDashComponent implements OnInit {
  constructor() { }
  menustatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'DashBoard',
      icon: 'fa-solid fa-house',
      link: 'property'
    },
    {
      number: '2',
      name: 'Property Listing',
      icon: 'fa-solid fa-bars',
      link: 'property'
    },
    {
      number: '3',
      name: 'Maintenance Management',
      icon: 'fa-solid fa-briefcase',
      link: 'property'
    },
    {
      number: '4',
      name: 'Lease Agreements',
      icon: 'fa-solid fa-handshake',
      link: 'property'
    },
    {
      number: '5',
      name: 'Rent Payment',
      icon: 'fa-solid fa-money-check-dollar',
      link: 'property'
    },
    {
      number: '6',
      name: 'Admin',
      icon: 'fa-solid fa-circle-user',
      link: 'property'
    },
  ]
  ngOnInit(): void {
    // location.reload();
  }

  sidetrigger() {
    this.menustatus = !this.menustatus

  }

}
