import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';

const URL = environment.apiUrl + '/api/upload';
@Component({
  selector: 'app-chart-one',
  templateUrl: './chart-one.component.html',
  styleUrls: ['./chart-one.component.scss']
})
export class ChartOneComponent implements OnInit {

  constructor() {
    
  }
  chartOne() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart.render();
  }

  /*--------------File Upload input------------------|START---------*/
  percentage: number = 0;
	public uploader: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'fileData'
	});
	ngOnInit() {
    this.chartOne();
		this.uploader.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
			form.append('data', "Send data to Server.");
		};
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('ImageUpload:uploaded:', item, status, response);
			console.log('File uploaded successfully');
		};
		this.uploader.onProgressItem = (progress: any) => {
			this.percentage = progress['progress'];
		};
   }
   /*--------------File Upload input------------------|END---------*/
}
