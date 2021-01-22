import { Component, OnInit } from '@angular/core';
import {CitiesService, City} from '../../services/cities.services'
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {


  ciudad:object;
  cities:string[]= [];
  nombre:string;
   ciudadSrv:any[] = [];


  constructor(private _citiesService:CitiesService, private http:HttpClient) { 


    this.consultDataWithSaveCoord(true, "Santiago");
    this.consultDataWithSaveCoord(true, "Londres");
    this.consultDataWithSaveCoord(true, "Zurich");
    this.consultDataWithSaveCoord(true, "Auckland");
    this.consultDataWithSaveCoord(true, "Georgia");
    this.consultDataWithSaveCoord(true, "Sydney");

    setInterval(()=> {     this.ciudadSrv = [];     this.consultDataWithSaveCoord(false, "Santiago");
    this.consultDataWithSaveCoord(false, "Londres");
    this.consultDataWithSaveCoord(false, "Zurich");
    this.consultDataWithSaveCoord(false, "Auckland");
    this.consultDataWithSaveCoord(false, "Georgia");
    this.consultDataWithSaveCoord(false, "Sydney");}, 10 * 1000);


     

  }

 consultDataWithSaveCoord(esInicio:boolean, ciudadString:string){
   console.log("clening...")


  console.log("wait 10 seconds to reload...");
  const Santiago = "http://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=2298978e1d8d29716f7d795c83033d7b";
  const Zurich = "http://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=2298978e1d8d29716f7d795c83033d7b";
  const Auckland = "http://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=2298978e1d8d29716f7d795c83033d7b";
  const Sydney = "http://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=2298978e1d8d29716f7d795c83033d7b";
  const Londres = "http://api.openweathermap.org/data/2.5/weather?q=Londres&appid=2298978e1d8d29716f7d795c83033d7b";
  const Georgia = "http://api.openweathermap.org/data/2.5/weather?q=Georgia&appid=2298978e1d8d29716f7d795c83033d7b";
  this._citiesService.getInfoCities();
     
    

 
      this.http.get("http://api.openweathermap.org/data/2.5/weather?q="+ciudadString+"&appid=2298978e1d8d29716f7d795c83033d7b", {
        params: {},
            observe: 'response'
        }).toPromise().then((res: any) => {
            console.log(res.body);
            this.http.get("http://api.openweathermap.org/data/2.5/weather?q="+ciudadString+"&appid=2298978e1d8d29716f7d795c83033d7b") .subscribe( (data:any) => {
              console.log("IIIIII"+esInicio);
              if(esInicio){
                this.http.post("http://localhost:3000/ping",
                {
                "city": ciudadString,  "lat": ""+data.coord.lat.toString()+"", "long": ""+data.coord.lon.toString()+""
                })
                .subscribe(
                    (val) => {
                        console.log("POST call succ", 
                                    val);
                    },
                    response => {
                        console.log("POST call succ", response);
                    },
                    () => {
                        console.log("POST call succ.");
                    });
              
                  }
                });
   
         
            let randomN = Math.random() * (1 - 0) + 0;
  
            if ((randomN < 0.1)) throw new Error('How unfortunate! The API Request Failed');
            else {
              this.ciudadSrv.push(res.body) ;
              /*if(esInicio){
                this.http.post("http://localhost:3000/ping",
                {
                "city": "Londres",  "lat": res.body.coord.lat, "long": "1"
                })
                .subscribe(
                    (val) => {
                        console.log("POST call successful value returned in body", 
                                    val);
                    },
                    response => {
                        console.log("POST call in error", response);
                    },
                    () => {
                        console.log("The POST observable is now completed.");
                    });
              
                  }*/
              console.log("ressta",res.body,"rand");
              console.log("r", randomN);
            }
       })
        .catch((err :any) => {
          this.http.get(Londres) .subscribe( (data:any) => {console.log("ok", data);
          
          this.ciudadSrv.push(data) 
        });
        
          console.warn("erraa");
          this.http.post("http://localhost:3000/saveError",  {
           
            }) .subscribe( (data:any) => {console.log("registro fallo")});
        });
    

      console.log("save1...", esInicio)

      console.log("save...", esInicio)
      console.log('this', this.ciudadSrv);


 }

  ngOnInit(): void {


  
     
 
   

  }

}
