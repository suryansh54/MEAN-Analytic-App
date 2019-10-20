import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { environment } from '../../environments/environment';
import { MessageAndLoaderServiceService } from '../services/message-and-loader-service.service';
import { MatSnackBar } from '@angular/material';
import { ChartsServiceService } from '../services/charts-service.service';

@Component({
  selector: 'app-chart-two',
  templateUrl: './chart-two.component.html',
  styleUrls: ['./chart-two.component.scss']
})
export class ChartTwoComponent implements OnInit {

  constructor(private messageAndLoader: MessageAndLoaderServiceService, private snackBar: MatSnackBar, private ChartDataService: ChartsServiceService) { }

  messageNotification(message: string, action: string, timeout: number) :void{
    this.snackBar.open(message, action, {
      duration: timeout
    });
  }
  chartTwo(data) {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Population data"
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

  chartTwoDynamicData(){
    this.ChartDataService.chartTwoApi().subscribe((countryData: any)=>{
      this.chartTwo(countryData.data.dataPoints);
      console.log(countryData.data.dataPoints);
    })
  }
  ngOnInit() {
    this.chartTwoDynamicData();
  }

}
