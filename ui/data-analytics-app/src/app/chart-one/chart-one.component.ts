import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import { MessageAndLoaderServiceService } from '../services/message-and-loader-service.service';
import { MatSnackBar } from '@angular/material';
import { ChartsServiceService } from '../services/charts-service.service';

const URL = environment.apiUrl + '/api/upload';
@Component({
  selector: 'app-chart-one',
  templateUrl: './chart-one.component.html',
  styleUrls: ['./chart-one.component.scss']
})
export class ChartOneComponent implements OnInit {

  UploadedFileList: Array<any> = [];
  constructor(private messageAndLoader: MessageAndLoaderServiceService, private snackBar: MatSnackBar, private ChartDataService: ChartsServiceService) {
    
  }
  
  messageNotification(message: string, action: string, timeout: number) :void{
    this.snackBar.open(message, action, {
      duration: timeout
    });
  }

  chartOne() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Population data"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Suffolk" },
          { y: 55, label: "USA" },
          { y: 50, label: "Warwickshire" },
          { y: 65, label: "Cheshire" },
          { y: 95, label: "London" },
          { y: 68, label: "Cumbria" },
          { y: 28, label: "Rutland" },
          { y: 34, label: "Cornwall" },
          { y: 14, label: "Essex" }
        ]
      }]
    });
      
    chart.render();
  }

  uploadedFileList() {
    this.ChartDataService.getUploadedFileList().subscribe((list:any)=>{
      this.UploadedFileList = list.reverse();
    });
  }
  /*--------------File Upload input------------------|START---------*/
  percentage: number = 0;
	public uploader: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'fileData'
	});
	ngOnInit() {
    this.uploadedFileList()
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
      this.messageNotification('File uploaded successfully' ,'Close', 3000);
      this.percentage = 0;
      this.uploadedFileList();
		};
		this.uploader.onProgressItem = (progress: any) => {
			this.percentage = progress['progress'];
		};
   }
   /*--------------File Upload input------------------|END---------*/
}
