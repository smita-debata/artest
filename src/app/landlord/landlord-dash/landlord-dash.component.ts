import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landlord-dash',
  templateUrl: './landlord-dash.component.html',
  styleUrls: ['./landlord-dash.component.css']
})
export class LandlordDashComponent implements OnInit {
  menustatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'DashBoard',
      icon: 'fa-solid fa-house',
      link: 'mainland'
    },
    {
      number: '2',
      name: 'Rental Listing',
      icon: 'fa-solid fa-bars',
      link: 'landlist'
    },
    {
      number: '3',
      name: 'Maintenance Management',
      icon: 'fa-solid fa-briefcase',
      link: 'rental'
    },
    {
      number: '4',
      name: 'Calendar',
      icon: 'fa-solid fa-calendar',
      link: 'mainland'
    },
    {
      number: '5',
      name: 'Tasks',
      icon: 'fa-solid fa-bars-progress',
      link: 'mainland'
    },
    {
      number: '6',
      name: 'Prequalification',
      icon: 'fa-solid fa-thumbs-up',
      link: 'mainland'
    },
    {
      number: '7',
      name: 'Admin',
      icon: 'fa-solid fa-circle-user',
      link: 'mainland'
    },
  ]
  activeItem = this.list[0];
  constructor() { }

  ngOnInit(): void {
    // location.reload();
  }
  sidetrigger() {
    this.menustatus = !this.menustatus

  }


}
