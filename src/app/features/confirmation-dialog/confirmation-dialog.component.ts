import { Component, HostListener, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent implements OnInit{

  src: SafeResourceUrl;

  constructor(public dialogService: DialogService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.dialogService.data.src);
  }

  getUrl() {
    return this.src;
  }

  onCancel() {
    this.dialogService.closeDialog();
  }

  onConfirm() {
    this.dialogService.confirmDialog();
  }

}
