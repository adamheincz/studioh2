import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogOpened = new Subject<boolean>();
  dialogNotifier = new Subject();
  data: {dialogType: string, name?: string, type?: string, src?: string};

  constructor() { }

  open(options?: {dialogType: string, name?: string, type?: string, src?:string}) {
    this.data = options;
    this.dialogOpened.next(true);
    return this.dialogNotifier?.asObservable();
  }

  getDialogOpenedListener() {
    return this.dialogOpened.asObservable();
  }

  closeDialog() {
    this.dialogOpened.next(false);
    this.dialogNotifier.next(false);
  }

  confirmDialog() {
    this.dialogOpened.next(false);
    this.dialogNotifier.next(true);
    this.dialogNotifier.next(false);
  }
}
