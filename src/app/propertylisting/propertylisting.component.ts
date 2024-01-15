import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-propertylisting',
  templateUrl: './propertylisting.component.html',
  styleUrls: ['./propertylisting.component.css']
})
export class PropertylistingComponent implements OnInit {
  isLinear = false;
  completed: boolean = true;
  checked = false;
  indeterminate = false;
  genAmenityOptions = [
    {name:'Balcony or deck', value:'1'},
    {name:'Bicycle Storage', value:'2'},
    {name:'Disabled Access', value:'3'},
    {name:'Dishwasher', value:'4'},
    {name:'Furnished', value:'5'},
    {name:'Pool', value:'6'}
  ]
  coolingOptions = [
    {name:'Central', value:'1'},
    {name:'Wall', value:'2'},
    {name:'Window', value:'3'}
  ]
  heatingOptions = [
    {name:'Forced Air', value:'1'},
    {name:'Baseboard', value:'2'},
    {name:'Heatpump', value:'3'},
    {name:'wall', value:'4'}
  ]
  parkingOptions = [
    {name:'Attached Parking', value:'1'},
    {name:'Attached Parking', value:'2'},
    {name:'Off-street Parking', value:'3'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
