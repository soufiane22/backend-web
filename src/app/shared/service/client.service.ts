import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { client } from '../Model/Client';
import {Chart } from 'chart.js'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

   API ="http://localhost:8093/client/"

  constructor(private httpClient: HttpClient) {
    
   }

  public getClients():Observable<any>{
    return this.httpClient.get<any>(this.API+'list/'+1000);
  }

  public getGender():Observable<any>{
    return this.httpClient.get<any>(this.API+'getgender');
  }

  public getStatistique():Observable<any>{
    return this.httpClient.get<any>(this.API+'getstatistic');
  }

  public getClusters():Observable<any>{
    return this.httpClient.get<any>(this.API+'getclusters');
  }

  public getChildren():Observable<any>{
    return this.httpClient.get<any>(this.API+'children');
  }
}
