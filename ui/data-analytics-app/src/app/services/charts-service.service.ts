import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChartsServiceService {

  constructor(private http: HttpClient, public router: Router) { }

  getUploadedFileList(){
    let uploadFileListURL = environment.apiUrl + '/api/upload-list';
    return this.http.get(uploadFileListURL);
  }

  fileData(url: string){
    let uploadFileListURL = environment.apiUrl + '/api/upload-list';
    return this.http.get(uploadFileListURL);
  }

  chartTwoApi(){
    let uploadFileListURL = environment.apiUrl + '/api/chart-two-data';
    return this.http.get(uploadFileListURL);
  }

  chartThreeApi(dataCount:number, x?:number){
    let postDataObj = {
      dataCount:dataCount,
      x:x
    }
    let uploadFileListURL = environment.apiUrl + '/api/chart-three-data';
    return this.http.post(uploadFileListURL, postDataObj, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
