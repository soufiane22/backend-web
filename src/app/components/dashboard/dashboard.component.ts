import { Component, OnInit , ElementRef  } from '@angular/core';
import { client } from 'src/app/shared/Model/Client';
import { ClientService } from 'src/app/shared/service/client.service';
import * as chartData from '../../shared/data/chart';
import { doughnutData, pieData } from '../../shared/data/chart';
import { Chart } from 'chart.js';
import { getNsPrefix } from '@angular/compiler';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public doughnutData = doughnutData;
  public pieData = pieData;

  listClients


  constructor(private clientService: ClientService , private elementRef: ElementRef) {
    Object.assign(this, { doughnutData, pieData })
  }


  public chart3 = chartData.chart3;

  products = [{ "label": "Sumsung", "quantity": 120 }, { "label": "Huawei", "quantity": 340 }, { "label": "Iphon", "quantity": 230 }]



  // events
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  homme: number = 0
  femme: number = 0
  isLoaded: boolean = false

  labels1=["Homme","Femme"]
  labels2=["Fumeur","Non Fumeur"]
  data1 =[]
  data2 = []
  title2= "nombre des fumeurs et non fumeur"
  title1= "Nombre des femmes et des hommes"


  // {x:9 , y: 15 },
  // {x:3 , y: 17 },
  // {x:20 , y: 8 },
  // {x:14 , y: 9 },
  // {x:10 , y: 20 },

  data4 =[ 
    {x:0, y: 0 , status:"50% Power"},
    {x:1 , y: 1 , status:"50% Power"},
    {x:2 , y: 2 , status:"50% Power"},
    {x:3 , y: 3 , status:"50% Power"},
    {x:4 , y: 4 , status:"50% Power"},
  ]




  ngOnInit() {
    this.isLoaded1 = false 
    this.clientService.getClients().subscribe(
      async data => {
        this.listClients = data.data.clients;
        // console.log("list des clients ===========>",data);
        // console.log("clients===>",this.listClients );


        await this.getGenre();
        await this.getStatistique();
       await this.getClusters()
        await this. getChildren()

      
   
        
        
     


      },
      error => {
        console.log("error", error);

      }
    )

    


  }
  ngAfterViewInit() {
    // if(this.isLoaded1){
    //   console.log("2--data3=====>");
      
    //   this.createScatter()
    // }
  
 
  }

  Cluster0=[]
  Cluster1=[]
  Cluster2=[]

  isLoaded1: Boolean = false ;
  data3 =[]
  getClusters(){
    this.clientService.getClusters().subscribe(
      success=>{
      this.Cluster0 = success.data.cluster0
      this.Cluster1 = success.data.cluster1
      this.Cluster2 = success.data.cluster2
      this.createScatter()
      // this.isLoaded1= true;

      },

error=>{
  console.log("errr===>",error)
}
    )
  }

  gender = { "homme": 0, "femme": 0 ,"Nosmokers":0 ,"smokers":0}
  getGenre() {
    
    this.clientService.getGender().subscribe(
      success => {

        this.gender = success.data.gender

        this.data1.push(this.gender.homme)
        this.data1.push(this.gender.femme)
        this.data2.push(this.gender?.smokers)
        this.data2.push(this.gender?.Nosmokers)
   
        // this.genre[0].somme = this.gender.homme

        // this.genre[1].somme = this.gender.femme


        this.isLoaded = true
      },
      error => {
        console.log("errr", error);

      }

    )



  }

  createScatter(){
    console.log("3-----creeer scatter");
    
    var myChart = new Chart('scatter', {
      type: 'scatter',
      data: {
        labels:['Cluster0', 'Custer1','Cluster3'],
        datasets: [
          {
          label:'Cluster0',
          data: this.Cluster0,
          backgroundColor: 
            'rgba(52, 152, 219, 0.5)'
          ,
          borderColor: 
            'rgba(52, 152, 219, 0.5)'
          ,
          borderWidth: 1
        },
        {
          label:'Cluster1',
          data: this.Cluster1 ,
          backgroundColor: 
            'rgba(38, 211, 26, 0.5)'
          ,
          borderColor: 
             'rgba(38, 211, 26, 0.5)'
          ,
          borderWidth: 1
        },
        {
          label:'Cluster2',
          data: this.Cluster2 ,
          backgroundColor: 
            'rgba(255, 128, 132, 0.5)'
          ,
          borderColor: 
          'rgba(255, 128, 132, 0.5)'
          ,
          borderWidth: 1
        },
      ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Clustering data'
        },
        maintainAspectRatio: false,
    
    }
  
    });
  }

nbrChildren = []
labels3 =["0 children", "1 childldren", "2 childldren","3 childldren","4 childldren","5 childldren"]
  getChildren(){
    this.clientService.getChildren().subscribe(
      success => {
       this.nbrChildren.push(success.data?.c0)
       this.nbrChildren.push(success.data?.c1)
       this.nbrChildren.push(success.data?.c2)
       this.nbrChildren.push(success.data?.c3)
       this.nbrChildren.push(success.data?.c4)
       this.nbrChildren.push(success.data?.c5)
       console.log("1----nbr children ====>", this.nbrChildren);
       this.creatbarchildren()
      },
      error =>{console.log("eroor",error);
      }
    )

  }

  myChart2
  creatbarchildren(){
    console.log("2----creatbarchildren");
    // let htmlRef = this.elementRef.nativeElement.querySelector('chartChild');
    this.isLoaded1 = true
    this.myChart2 = new Chart( 'chartChild', {
      type: 'bar',
      data: {
        labels: this.labels3,
        datasets: [{
          label: "statistique des enfants ",
          data:  this.nbrChildren,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(65, 230, 86, 0.2)',
            'rgba(255, 229, 47, 0.2)',
            'rgba(19, 201, 202, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(65, 230, 86, 1)',
            'rgba(255, 229, 47, 1)',
            'rgba(19, 201, 202, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        },
        
   ]
   
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
    }

    });

  }

  statistique
  nbrClient
  nbrExpenses
  getStatistique(){
    this.clientService.getStatistique().subscribe(
      success => { 
        this.statistique = success.data
        // console.log("statistique");
        this.nbrClient = this.statistique?.nbrClient
        this.nbrExpenses = this.statistique?.nbrexpenses
      }
    )
  }

  





}


