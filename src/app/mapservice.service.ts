import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {


  constructor(private http: HttpClient) {
  }
  private apiUrl = 'https://api.example.com/auth'; // Replace with your authentication API endpoint
  private mapsUrl = 'https://kwa.smarttvm.in:8443/smartmeter_webapp/api/rest/manageRawDataService/assetLocationDetails';
  private gatewayUrl = "https://kwa.smarttvm.in:8443/smartmeter_webapp/api/rest/manageRawDataService/gatewayList";
  private markerUrl = 'https://kwa.smarttvm.in:8443/smartmeter_webapp/api/rest/manageRawDataService/assetLocationDetails';
  private GatewayMarkerUrl = 'https://kwa.smarttvm.in:8443/smartmeter_webapp/api/rest/manageRawDataService/assetLocationDetails';


  login(email: string, passwod: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, passwod });
  }
  register(email: string, password: string): Observable<any> {
    // Make an HTTP request to your registration API endpoint
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }


  getdat() {
    return this.http.get(this.mapsUrl)
  }

  resetPassword(email: string): Observable<any> {
    // Make an HTTP request to your password reset API endpoint
    return this.http.post(`${this.apiUrl}/reset-password`, { email });
  }

  mapsUrlDetails(routeName?: string): Observable<any> {
    let params = new HttpParams();
    if (routeName) {
      params = params.set('routeName', routeName);
    }

    return this.http.get(this.mapsUrl, { params });
  }


  gatewayMarkerUrlDetails(gateway?: string) {
    let params = new HttpParams();
    if (gateway) {
      params = params.set('gateway', gateway);
    }

    return this.http.get(this.GatewayMarkerUrl, { params })
  }

  gatewayUrlDetails() {
    return this.http.get(this.gatewayUrl)
  }


  MarkerUrlDetails(routeMarker?: string): Observable<any> {
    let params = new HttpParams();
    if (routeMarker) {
      params = params.set('routeMarker', routeMarker);
    }

    return this.http.get(this.markerUrl, { params });
  }
}
