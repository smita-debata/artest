import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {
    @ViewChild('myGoogleMap', { static: true }) map!: GoogleMap;
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
    selectedRoute: string | null = null; // Default to null, meaning no route selected initially
    // onGatewayFilterChange: string | null = null;
    mapOptions: google.maps.MapOptions = {
        center: { lat: 8.519946, lng: 76.998535 },
        zoom: 15,
        mapTypeControl: false,
    };
    mappeddata: any[] = [];

    constructor(private mapService: AuthService) { }

    handleMapInitialized(map: google.maps.Map) {
        // console.log(map)
        console.log('InitializeMap')
        this.mapService.mapsUrlDetails().subscribe((res) => {
            console.log("Checking Data", res)
            const mapData: any = res;
            this.metersListedCount = mapData.metersListedCount;
            this.markers = mapData.assetDetails;
            this.gateways = mapData.gateways;
            console.log(this.gateways)
            console.log(this.markers);
            this.mappeddata=this.markers
            const tempMarkers: any[] = [];
            this.markers.forEach((marker) => {
                const tempMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(marker.latitude, marker.longitude),
                    map,
                    title: marker.address,
                    icon: {
                        // You can customize the marker icon based on the "color" property
                        url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}.png`,
                      },
                  });
              
                //   this.markers.push(tempMarker);
                  tempMarkers.push(tempMarker); 
                  this.markers = tempMarkers;

                // console.log(tempMarker);

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

            this.onRouteFilterChange(map);
            // // const routeMarker = ['24', '48', 'withinweek', 'morethanweek'];
            // // const filterValues = ['green', 'blue', 'orange', 'red'];
            
            // // for (const routeMarker of routeMarkers) {
            // //     for (const filterValue of filterValues) {
            // //         this.LoadMapPoints(routeMarker, filterValue, map);
            // //     }
            // // }
            // // this.LoadMapPoints();
            // this.OnGateChange({ target: { value: this.selectedGatewayUniqueId } },map)
        })
        
    }
   
     
      
    ngOnInit(): void {
        console.log("Load Map");
    }

    LoadMapPoints(routeMarker: string,filterValue:string, map: google.maps.Map): void {
        this.isRefreshing = true;

        // Filter the markers based on the selected time range and color
        this.filteredMarkers = this.allMarkers.filter(
            marker => marker.routeMarker === routeMarker && marker.color === filterValue
            // && marker.color == selectedColor
        );
        console.log("Loadmapdata", routeMarker)


        if (routeMarker === null) {
            this.filteredMarkers = this.allMarkers;
        } else {
            this.mapService.MarkerUrlDetails(routeMarker).subscribe((res) => {
                let MarkerData = res.assetDetails
                console.log("Filtered Marker data", MarkerData)
                this.markers = [];
                this.markers = MarkerData;
                this.metersListedCount = this.markers.length; // Update count

                // Apply color filter based on color from the backend
                  if (routeMarker === '24') {
                    this.filteredMarkers = this.filteredMarkers.filter(marker => marker.color === 'green');
                  } else if (routeMarker === '48') {
                    this.filteredMarkers = this.filteredMarkers.filter(marker => marker.color === 'blue');
                  } else if (routeMarker === 'withinweek') {
                    this.filteredMarkers = this.filteredMarkers.filter(marker => marker.color === 'orange');
                  } else if (routeMarker === 'morethanweek') {
                    this.filteredMarkers = this.filteredMarkers.filter(marker => marker.color === 'red');
                  }
                //   this.markers.forEach(marker => {
                //     marker.url = this.markers[marker.color];
                //   });
                // this.markers.forEach(marker => {
                //     marker.url = "http://maps.google.com/mapfiles/ms/icons/" + marker.color + ".png";
                // });
                // if(map){
                this.markers.forEach((marker) => {
                    let url = "http://maps.google.com/mapfiles/ms/icons/";
                    //   url += marker.color + "-dot.png";
                    url += marker.color + ".png";
                    let tempMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(marker.latitude, marker.longitude),
                        map,
                        title: marker.address,
                        // animation: google.maps.Animation.DROP,
                        icon: {
                            url: url
                        }
                    });
                    // console.log(tempMarker);
    
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
                    // }
    
                    
                });
            // }
            });
        }
        
        this.isRefreshing = false;
    }


    // filterMarkers(type: string, m_LastBaseNameFilter: string | null) {
    //     const now = new Date(); // Get the current date and time

    //     if (type === '24') {
    //         const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    //         return this.allMarkers.filter(marker =>
    //             new Date(marker.m_LastUpdate) >= twentyFourHoursAgo
    //         );
    //     } else if (type === '48') {
    //         const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48 hours ago
    //         return this.allMarkers.filter(marker =>
    //             new Date(marker.m_LastUpdate) >= fortyEightHoursAgo
    //         );
    //     } else if (type === 'withinweek') {
    //         const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago
    //         return this.allMarkers.filter(marker =>
    //             new Date(marker.m_LastUpdate) >= oneWeekAgo
    //         );
    //     } else if (type === 'morethanweek') {
    //         const moreThanOneWeekAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000); // More than 1 week ago
    //         return this.allMarkers.filter(marker =>
    //             new Date(marker.m_LastUpdate) < moreThanOneWeekAgo
    //         );
    //     }
    //     else if (type === 'gateways' && this.selectedLrcid && m_LastBaseNameFilter) {
    //         return this.allMarkers.filter(marker =>
    //             marker.lrcid === this.selectedLrcid && marker.m_LastBaseName === m_LastBaseNameFilter
    //         );
    //     } else if (type === 'gateways' && this.selectedLrcid) {
    //         return this.allMarkers.filter(marker =>
    //             marker.lrcid === this.selectedLrcid
    //         );
    //     } else if (type === 'gateways' && m_LastBaseNameFilter) {
    //         return this.allMarkers.filter(marker =>
    //             marker.m_LastBaseName === m_LastBaseNameFilter
    //         );
    //     } else {
    //         return this.allMarkers;
    //     }
    // }


    OnGateChange(event: any, map: google.maps.Map): void {
        console.log(event.target.value);
        this.selectedGatewayUniqueId = event.target.value;

        if (this.selectedGatewayUniqueId === 'clear') {
            this.markers = this.markersTest;
            
        } else {
            this.markers = this.markersTest.filter(marker => marker.gatewayUniqueId === this.selectedGatewayUniqueId);
            this.mapService.gatewayMarkerUrlDetails(this.selectedGatewayUniqueId).subscribe((res: any) => {
                let filterGatewayData = res.assetDetails
                console.log("Filtered Marker Gateway data", filterGatewayData)
                this.markers = [];
                         // Update marker URLs based on the selected route filter
            // this.markers.forEach(marker => {
            //     marker.url = `http://maps.google.com/mapfiles/ms/icons/${marker.color}.png`;
            // });
               
               
               this.markers.forEach((marker) => {
                let url = "http://maps.google.com/mapfiles/ms/icons/";
                //   url += marker.color + "-dot.png";
                url += marker.color + ".png";
                let tempMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(marker.latitude, marker.longitude),
                    map,
                    title: marker.address,
                    // animation: google.maps.Animation.DROP,
                    icon: {
                        url: url
                    }
                });
                // console.log(tempMarker);

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
                // }

                
            });
                this.metersListedCount = filterGatewayData.length; // Update count
            })

        }


        // this.handleMapInitialized(this.map?.googleMap!);

        // this.handleMapInitialized(this.map?.googleMap!);

        // if (this.onGatewayFilterChange === null) {
        //     this.filteredMarkers = this.allMarkers;
        //   } else {
        //   //   this.filteredMarkers = this.allMarkers.filter(marker =>{ 
        //   //     console.log("Marker",marker)
        //   //     marker.routeName === this.selectedRoute});
        //   //   console.log("Filtered Markers:", this.filteredMarkers);
        //   this.mapService.mapsUrlDetails(this.onGatewayFilterChange).subscribe((res)=>{
        //       // console.log("Filtered data",res)
        //       let GatewayFilterData = res.assetDetails
        //       // this.markers=[];
        //       // this.markers.push(GatewayFilterData.filter((marker:any) =>{ 
        //       //         console.log("Marker",marker)
        //       //         marker.routeName === this.selectedRoute}));
        //       //       console.log("Filtered Markers:", this.markers);
        //       console.log("Filtered Gateway data",GatewayFilterData)
        //       this.markers=[];
        //       this.markers = GatewayFilterData;

        //   })
        //   }
    }

   
    onRouteFilterChange(map: google.maps.Map):void {
        console.log("Selected Route:", this.selectedRoute);


        if (this.selectedRoute === null) {
            this.filteredMarkers = this.allMarkers;
            this.metersListedCount = this.filteredMarkers.length; // Update count

        } else {
            this.mapService.mapsUrlDetails(this.selectedRoute).subscribe((res) => {
                let filterData = res.assetDetails 
                console.log("Filtered data", filterData)
                this.markers = [];
                this.markers = filterData;
                this.filteredMarkers = this.markers;

                 // Update marker URLs based on the selected route filter
            // this.markers.forEach(marker => {
            //     marker.url = `http://maps.google.com/mapfiles/ms/icons/${marker.color}.png`;
            // });
            if(map){
            this.filteredMarkers.forEach((marker) => {
                let url = "http://maps.google.com/mapfiles/ms/icons/";
                //   url += marker.color + "-dot.png";
                url += marker.color + ".png";
                let tempMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(marker.latitude, marker.longitude),
                    map,
                    title: marker.address,
                    // animation: google.maps.Animation.DROP,
                    icon: {
                        url: url
                    }
                });
                console.log(tempMarker);

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
                // }

                
            });
        }
                this.metersListedCount = this.filteredMarkers.length; // Update count
            })
            
        }


    }
    clearRouteFilter() {
        this.selectedRoute = null;
        this.metersListedCount = this.markers.length; // Update count
        this.mapData = this.selectedRoute;
        // this.handleMapInitialized(this.map?.googleMap!);
    }

}

