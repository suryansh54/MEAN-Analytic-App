import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageAndLoaderServiceService {

  constructor(private snackBar: MatSnackBar) { }

  messageNotification(message: string, action: string, timeout: number) :void{
    this.snackBar.open(message, action, {
      duration: timeout
    });
  }

}
