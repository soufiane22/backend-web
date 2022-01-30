import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js'
import * as _ from 'lodash';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnChanges {

  @Input('my-id') myId
  @Input('type') type = "bar"
  @Input('data') data = []
  @Input('labels') labels =[]
  @Input('title') title =""
 
 

  constructor() { }

  ngOnChanges() {
    // this.createChart()
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    // this.createChart()
  }
  ngAfterViewInit() {
    // console.log("data====>",this.data);
    
    this.createChart()

  }

  ngAfterContentInit(){
    // this.createChart()
  }
   createChart() {
    // console.log("2----data",this.data);
    
    // let labels = _.map(this.data, 'sexe')
  

    let quantities = []
    // this.data.forEach(element => {
    //   console.log("3----element===>",element);
    //   quantities.push(element.somme)
    // })

      quantities = _.map(this.data, 'somme')
    // console.log("4-----quantities=====>", quantities);


    var myChart = new Chart(this.myId, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [{
          label: this.title,
          data: this.data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
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




}
