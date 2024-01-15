import { Component, OnInit, ViewChild } from '@angular/core';
import { MapserviceService } from '../mapservice.service';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { map } from 'rxjs';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild('googleMap', { static: false }) googleMap: any;
  infoWindow!: google.maps.InfoWindow;
  title = 'Map_Markers';
  markers: any[] = [];
  markersTest: any[] = [];
  allMarkers: any[] = [];
  gateways: any[] = [];
  selectedLrcid: string | null = null;
  selectedLastBaseName: string | null = null;
  selectedGatewayColor: string | null = null; // New property to store selected gateway color
  metersListedCount = 0; // Initialize the count
  filteredMarkers: any[] = [];
  mapData: any;
  isRefreshing: boolean = false;
  selectedGatewayUniqueId: string = ''; // Add this line
  selectedRoute: string = ''; // Default to null, meaning no route selected initially
  // onGatewayFilterChange: string | null = null;
  mapOptions: google.maps.MapOptions = {
    center: { lat: 8.519946, lng: 76.998535 },
    zoom: 15,
    mapTypeControl: false,
  };

  mappeddata: any[] = [];
  constructor(private mapService: MapserviceService) { }

  ngOnInit(): void {

  }

  initMarkers(map: google.maps.Map) {
    this.mapService.mapsUrlDetails().subscribe((res) => {
      console.log("Checking Data", res)
      const mapData: any = res;
      this.metersListedCount = mapData.metersListedCount;
      this.markers = mapData.assetDetails;
      this.gateways = mapData.gateways;
      console.log(this.gateways)
      console.log(this.markers);
      this.mappeddata = this.markers
      const tempMarkers: any[] = [];
      this.markers.forEach((marker) => {
        const tempMarker = new google.maps.Marker({
          position: new google.maps.LatLng(marker.latitude, marker.longitude),
          map,
          title: marker.address,
          icon: {
            url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}.png`,
          },
        });
        tempMarkers.push(tempMarker);
        this.markers = tempMarkers;
        const infowindow = new google.maps.InfoWindow({
          content: '<div>' +
            '<p>Customer ID: <b>' + marker.consumerId + '</b></p>' +
            '<p>Serial No: ' + marker.serialNumber + '</p>' +
            '<p>Dev EUI: ' + marker.devEUI + '</p>' +
            '<p>Installation Date: ' + marker.installDate + '</p>' +
            '<p>Meter Value: <span style="color: red; font-weight: bold;">' + marker.meterValueDate + '</span></p>' +
            '<p>Address: <span style="border: 1px solid #FFCC80; padding: 5px; border-radius: 5px;background:#FAEBD7">' + marker.address + '</span></p>' +
            '<p>Gateway: <b>' + marker.gateway + '</b></p>' +
            '<p>Number Of Units: <b>' + marker.numberOfUnits + '</b></p>' +
            '<p>Route No: ' + marker.routeName + '</p>' +
            '</div>',
        });
        tempMarker.addListener('click', ((tempMarker, map) => {
          return () => {
            infowindow.open(map, tempMarker);
          }
        })(tempMarker, map))


      });

      this.gateways.forEach((marker) => {
        let url = "assets/markers/" + marker.color + ".png";
        let tempMarker = new google.maps.Marker({
          position: new google.maps.LatLng(marker.latitude, marker.longitude),
          map,
          title: marker.gatewayName,
          icon: {
            url: url
          }
        });
        const infowindow = new google.maps.InfoWindow({
          content: '<p><b>Gateway Name</b> : ' + marker.gatewayName + '</p>',
        });
        tempMarker.addListener('click', ((tempMarker, map) => {
          return () => {
            infowindow.open(map, tempMarker);
          }
        })(tempMarker, map))
      });
    })
  }

  applyfilter(map: any) {
    console.log("Selected Route:", this.selectedRoute);
    if (this.selectedRoute === null) {
      this.filteredMarkers = this.allMarkers;
      this.metersListedCount = this.filteredMarkers.length;
    } else {
      this.mapService.mapsUrlDetails(this.selectedRoute).subscribe((res) => {
        console.log("Checking Data", res)
        const mapData: any = res;
        this.metersListedCount = mapData.metersListedCount;
        this.markers = mapData.assetDetails;
        this.gateways = mapData.gateways;
        console.log(this.gateways)
        console.log(this.markers);
        this.mappeddata = this.markers
        const tempMarkers: any[] = [];
        this.markers.forEach((marker) => {
          const tempMarker = new google.maps.Marker({
            position: new google.maps.LatLng(marker.latitude, marker.longitude),
            map,
            title: marker.address,
            icon: {
              url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}.png`,
            },
          });
          tempMarkers.push(tempMarker);
          this.markers = tempMarkers;
          const infowindow = new google.maps.InfoWindow({
            content: '<div>' +
              '<p>Customer ID: <b>' + marker.consumerId + '</b></p>' +
              '<p>Serial No: ' + marker.serialNumber + '</p>' +
              '<p>Dev EUI: ' + marker.devEUI + '</p>' +
              '<p>Installation Date: ' + marker.installDate + '</p>' +
              '<p>Meter Value: <span style="color: red; font-weight: bold;">' + marker.meterValueDate + '</span></p>' +
              '<p>Address: <span style="border: 1px solid #FFCC80; padding: 5px; border-radius: 5px;background:#FAEBD7">' + marker.address + '</span></p>' +
              '<p>Gateway: <b>' + marker.gateway + '</b></p>' +
              '<p>Number Of Units: <b>' + marker.numberOfUnits + '</b></p>' +
              '<p>Route No: ' + marker.routeName + '</p>' +
              '</div>',
          });
          tempMarker.addListener('click', ((tempMarker, map) => {
            return () => {
              infowindow.open(map, tempMarker);
            }
          })(tempMarker, map))


        });

        this.gateways.forEach((marker) => {
          let url = "assets/markers/" + marker.color + ".png";
          let tempMarker = new google.maps.Marker({
            position: new google.maps.LatLng(marker.latitude, marker.longitude),
            map,
            title: marker.gatewayName,
            icon: {
              url: url
            }
          });
          const infowindow = new google.maps.InfoWindow({
            content: '<p><b>Gateway Name</b> : ' + marker.gatewayName + '</p>',
          });
          tempMarker.addListener('click', ((tempMarker, map) => {
            return () => {
              infowindow.open(map, tempMarker);
            }
          })(tempMarker, map))
        });
      })
    }
  }

  handleMapInitialized(map: google.maps.Map) {
    // console.log(map)
    console.log('InitializeMap')
    this.initMarkers(map)
  }
}




