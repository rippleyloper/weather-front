import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable()
export class CitiesService{
 
    private cities:string[] = [
        "Santiago",
        "Zurich ",
        "Auckland ",
        "Sydney",
        "Londres",
        "Georgia"
        
        ];
        public nom:string = "aa";

        private  citiesLoaded:any[] = [];
        
    constructor(private http:HttpClient){

        console.log("starting cities service ...")
    }


   
    getCities(){
        return this.cities;
    }
     getInfoCities():string{
       
     
      
    return "";
       }
    loadCities(nameCity:string){

   
    }
}

export function loadCitiesF(nameCity:string, ht:HttpClient){


  
   
 
  }
export interface City{ 
     country:string,
name:string,
lat:string,
lng: string,
temp: number
        
};