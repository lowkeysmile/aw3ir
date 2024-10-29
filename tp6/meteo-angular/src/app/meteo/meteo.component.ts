import { Component, OnInit } from '@angular/core';
import { MeteoItem } from '../meteoItem';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  city: MeteoItem = {
    name: '',
    id: 0,
    weather: null
  };

  cityList: MeteoItem[] = []; 

  constructor() {}

  ngOnInit(): void {
    
    const storedList = localStorage.getItem('cityList');
    if (storedList) {
      this.cityList = JSON.parse(storedList);
    }
  }

  onSubmit() {
    
    if (this.city.name && !this.isCityExist(this.city.name)) {
      const newCity = { ...this.city }; 
      this.cityList.push(newCity);
      this.saveCityList(); 
      console.log(`${this.city.name} добавлен в список`);
    } else {
      console.log(`${this.city.name} уже есть в списке`);
    }
  }

  remove(cityToRemove: MeteoItem) {
    
    this.cityList = this.cityList.filter(city => city.name !== cityToRemove.name);
    this.saveCityList();
  }

  isCityExist(name: string): boolean {
    
    return this.cityList.some(city => city.name?.toLowerCase() === name.toLowerCase());
  }

  saveCityList() {
    
    localStorage.setItem('cityList', JSON.stringify(this.cityList));
  }
}
