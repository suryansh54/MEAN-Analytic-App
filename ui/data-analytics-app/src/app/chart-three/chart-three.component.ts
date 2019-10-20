import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { environment } from '../../environments/environment';
import { MessageAndLoaderServiceService } from '../services/message-and-loader-service.service';
import { MatSnackBar } from '@angular/material';
import { ChartsServiceService } from '../services/charts-service.service';

@Component({
  selector: 'app-chart-three',
  templateUrl: './chart-three.component.html',
  styleUrls: ['./chart-three.component.scss']
})
export class ChartThreeComponent implements OnInit {
  maxRange: number = 0;
  constructor(private messageAndLoader: MessageAndLoaderServiceService, private snackBar: MatSnackBar, private ChartDataService: ChartsServiceService) { }

  messageNotification(message: string, action: string, timeout: number) :void{
    this.snackBar.open(message, action, {
      duration: timeout
    });
  }

  chartThree(data) {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Random data"
      },
      data: [{
        type: "bubble",
        showInLegend: true,
        legendText: "Size of Bubble Represents Population in Millions",
        legendMarkerType: "circle",
        legendMarkerColor: "grey",
        toolTipContent: "<b>{name}</b><br/>Life Exp: {x} yrs<br/> Fertility Rate: {y}<br/> Population: {z}mn",
        dataPoints: data
      }]
    });
      
    chart.render();
  }

  chartThreeDynamicData(){
    this.ChartDataService.chartThreeApi().subscribe((countryData: any)=>{
      this.chartThree(countryData.data.dataPoints);
      this.maxRange = countryData.data.dataPoints.length;
    })
  }

  selectRange(e: any){
    console.log(e.target.value);
  }
  ngOnInit() {
    this.chartThreeDynamicData();
  }

}
