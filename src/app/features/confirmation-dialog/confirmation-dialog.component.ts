import { Component, HostListener, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent {

  constructor(public dialogService: DialogService) { }

  onCancel() {
    this.dialogService.closeDialog();
  }

  onConfirm() {
    this.dialogService.confirmDialog();
  }

}
