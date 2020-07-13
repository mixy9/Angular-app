import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) {}

  configUrl = 'http://api.weatherstack.com/current?access_key=0f918b1123b5e02ce09c8ba5d250df4c&query=';

  getWeather(location){
      return this.http.get(
        this.configUrl + location
      );
  }
}
