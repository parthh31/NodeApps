import { Component   } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  name = 'jeni sangani';
  age=20;
  birthdate='23-05-1999';
  qualification=["Bsc.IT","Msc.IT"]
  hobby=["Reading","Study","Swaming"]
 
  countryList: Array<any> = [
    { name: 'Germany', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] },
    { name: 'Spain', cities: ['Barcelona'] },
    { name: 'USA', cities: ['Downers Grove'] },
    { name: 'Mexico', cities: ['Puebla'] },
    { name: 'China', cities: ['Beijing'] },
  ];
  cities: Array<any>;
  changeCountry(count) {
    this.cities = this.countryList.find(con => con.name == count).cities;
  }
  
  onClickSubmit(data) {
    alert("Entered Email id : " + data.emailid); 
    
 }
}
