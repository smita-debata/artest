import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-rentlisting',
  templateUrl: './rentlisting.component.html',
  styleUrls: ['./rentlisting.component.css']
})

export class RentlistingComponent implements OnInit {

  property: any;
  portpolio: any
  propertylist: any;
  portpoliolist: any
  constructor() {
    this.propertylist = [
      { name: 'Property', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    this.portpoliolist = [
      { name: 'Portpolio', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }





  ngOnInit(): void {
  }

}
