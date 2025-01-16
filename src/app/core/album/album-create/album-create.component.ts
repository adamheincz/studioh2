import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../album.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Album } from '../album.model';
import { Photo } from '../photo.model';
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {

  albumCreateForm: FormGroup;
  imagePreviews: string[] = [];
  imagesToBeDeleted: string[] = [];

  private mode = 'create';
  private albumId: string;
  private album: Album = {
    id: null,
    title: null,
    order: null,
    photos: []
  };
  private images: File[] = [];

  constructor(public albumsService: AlbumsService, private formBuilder: FormBuilder, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.albumCreateForm = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required] }),
      'photos': new FormArray([], {validators: [Validators.required] })
    });
    console.log(this.imagePreviews);
    console.log(this.imagesToBeDeleted);
    
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('albumId')) {
        this.mode = 'edit';
        this.albumId = paramMap.get('albumId');
        this.albumsService.getAlbum(this.albumId).subscribe(albumData => {
          this.album = {
            id: albumData._id,
            title: albumData.title,
            order: albumData.order,
            photos: albumData.photos.map(photo => {
              return {
                  id: photo._id,
                  title: photo.title,
                  imagePath: photo.imagePath,
              }
          })}

          this.album.photos.forEach(photo => {
            this.addPhotoForm();
          });
  
          this.albumCreateForm.controls['title'].setValue(this.album.title);
  
          for(let i = 0; i < this.photosFormArray.length; i++) {
            this.photosFormArray.at(i).get('phototitle').setValue(this.album.photos[i].title);
            this.photosFormArray.at(i).get('image').setValue(this.album.photos[i].imagePath);
            this.imagePreviews[i] = this.album.photos[i].imagePath;
          }

        });

      } else {
        this.mode = 'create';
      }
    });
  }

  addPhotoForm() {
    const photo = this.formBuilder.group({
      'phototitle': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });

    this.photosFormArray.insert(0, photo);
    this.imagePreviews.unshift('');
  }

  removePhotoForm(index: number) {
    if(typeof(this.photosFormArray.at(index).value.image) === 'string') {
      this.imagesToBeDeleted.push(this.photosFormArray.at(index).value.image)
      console.log(this.imagesToBeDeleted);
    }
    this.photosFormArray.removeAt(index);
    this.imagePreviews .splice(index, 1);
  }

  onImagePicked(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.item(0);

    if(typeof(this.photosFormArray.at(index).value.image) === 'string') {
      this.imagesToBeDeleted.push(this.photosFormArray.at(index).value.image)
      console.log(this.imagesToBeDeleted);
    }

    this.photosFormArray.at(index).patchValue({
      'image': file
    });
    this.photosFormArray.at(index).get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews[index] = reader.result as string;
    }
    reader.readAsDataURL(file as File);
    console.log(this.albumCreateForm);
    console.log(this.imagePreviews);
  }

  get photosFormArray(){
    return this.albumCreateForm.get('photos') as FormArray;
  }


  onSaveAlbum() {
    if(this.albumCreateForm.invalid) {
      console.log("Form is invalid!");
      return;
    }
    if(this.mode == "create") {
      this.album.title = this.albumCreateForm.value.title;

      for (let element of  this.albumCreateForm.value.photos) {
        let photo: Photo = {
          id: null,
          title: element.phototitle,
          imagePath: null
        };
        
        this.album.photos.push(photo);
        this.images.push(element.image);
      }
      console.log(this.album);
      this.albumsService.addAlbum(this.album, this.images);
    } else {
      console.log(this.albumCreateForm);
      console.log(this.album);
      this.album.title = this.albumCreateForm.value.title;
      this.album.photos = [];

      for (let element of  this.albumCreateForm.value.photos) {
        let photo: Photo = {
          id: null,
          title: null,
          imagePath: ''
        };

        if(typeof(element.image) === 'string') {
            photo.title = element.phototitle;
            photo.imagePath = element.image;
        } else {
          photo.title = element.phototitle;
          this.images.push(element.image);
        }
        
        this.album.photos.push(photo);
      }
      console.log(this.album);
      console.log(this.images);
      console.log(this.imagesToBeDeleted);
      this.albumsService.updateAlbum(this.album, this.images, this.imagesToBeDeleted);
    }
  }

  drop(event: CdkDragDrop<Photo[]>) {
    console.log(event);
    const currentGroup = this.photosFormArray.at(event.previousIndex);
    this.photosFormArray.removeAt(event.previousIndex);
    this.photosFormArray.insert(event.currentIndex, currentGroup);
    moveItemInArray(this.imagePreviews, event.previousIndex, event.currentIndex);
  }
}
