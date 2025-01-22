import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumsService } from '../../album/album.service';
import { Album } from '../../album/album.model';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from '../../../features/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from '../../../features/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  albums: Album[] = [];
  private albumsSub: Subscription;
  private dialogSub: Subscription;
  isOrderChanged = false;

  constructor(public albumsService: AlbumsService, public dialogService: DialogService){}

  ngOnInit(): void {
    this.albumsService.getAlbums();
    this.albumsSub = this.albumsService.getAlbumsUpdatedListener()
      .subscribe((albums: Album[]) => {
        this.albums = albums;
        console.log(albums);
      });
  }

  openConfirmationDialog(name: string, id: string) {
    this.dialogSub = this.dialogService.open({
      dialogType: 'confirmation',
      name: name,
      type: 'album',
    }).subscribe((confirmed) => {
      if(confirmed) {
        this.onDelete(id);
      }
    });
  }

  onDelete(id: string) {
    this.albumsService.deleteAlbum(id);
    this.albumsSub = this.albumsService.getAlbumsUpdatedListener()
      .subscribe((albums: Album[]) => {
        this.albums = albums;
        console.log(albums);
      });
  }

  onSaveOrder() {
    this.albumsService.reorderAlbums(this.albums);
    this.isOrderChanged = false;
  }

  drop(event: CdkDragDrop<Album[]>) {
    console.log(event);
    moveItemInArray(this.albums, event.previousIndex, event.currentIndex);
    this.isOrderChanged = true;
    this.albums.forEach(album => {
      album.order = this.albums.findIndex((a) => a.id == album.id)
    });
    console.log(this.albums);
  }

  ngOnDestroy(): void {
    this.albumsSub.unsubscribe();
    if(this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }
}
