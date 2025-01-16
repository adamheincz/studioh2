import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { Album } from "./album.model";
import { Router } from "@angular/router";

const BACKEND_URL = environment.apiUrl + "/albums/"

@Injectable({
    providedIn: 'root'
})
export class AlbumsService {
    private albums: Album[] = [];
    private albumsUpdated = new Subject<Album[]>();

    constructor(private http: HttpClient, private router: Router) { }

    getAlbums() {
        this.http.get<{ message: string, albums: { _id: string, title: string, order: number, photos: { _id: string, title: string, imagePath: string }[] }[] }>(
            BACKEND_URL
            )
            .pipe(map((albumData) => {
                return albumData.albums.map(album => {
                    return {
                        id: album._id,
                        title: album.title,
                        order: album.order,
                        photos: album.photos.map(photo => {
                            return {
                                id: photo._id,
                                title: photo.title,
                                imagePath: photo.imagePath,
                            }
                        })
                    };
                });
            }))
            .subscribe(transformedAlbums => {
                this.albums = transformedAlbums;
                this.albumsUpdated.next([...this.albums]);
            });
    }

    getAlbumsUpdatedListener() {
        return this.albumsUpdated.asObservable();
    }

    getAlbum(id: string) {
        return this.http.get<{ _id: string, title: string, order: number, photos: { _id: string, title: string, imagePath: string }[] }>(
            BACKEND_URL + id
            );
    }

    addAlbum(album: Album, images: File[]) {
        const albumData = new FormData();
        albumData.append("title", album.title);
        albumData.append("photos",JSON.stringify(album.photos));
        albumData.append("order", this.albums.length.toString())
        
        for(let i = 0; i < images.length; i++) {
            albumData.append("imageFiles", images[i]);
        }

        this.http.post<{ message: string, album: Album }>(BACKEND_URL, albumData)
            .subscribe((responseData) => {
                console.log("album:");
                console.log(responseData.album);
                const newAlbum: Album = {
                    id: responseData.album.id,
                    title: album.title,
                    order: this.albums.length,
                    photos: responseData.album.photos
                }
                console.log(responseData.message);
                console.log(newAlbum);
                this.albums.push(newAlbum);
                this.albumsUpdated.next([...this.albums]);
                this.router.navigate(['/dashboard']);
            });
    }

    deleteAlbum(id: string) {
        this.http.delete<{ message: string}>(BACKEND_URL + id)
            .subscribe((responseData) => {
                console.log(responseData.message);
                let deletedAlbum = this.albums.filter((album) => album.id === id)[0];
                let higherAlbums = this.albums.filter((album) => album.order > deletedAlbum.order);
                higherAlbums.forEach(element => {
                    element.order -= 1;
                });
                this.albums = this.albums.filter((album) => album.id !== id);
                this.albumsUpdated.next([...this.albums]);
                console.log(this.albums);
            });
    }

    updateAlbum(album: Album, images: File[], imagesToBeDeleted: string[]) {
        console.log("update_album");
        const albumData = new FormData();
        albumData.append("title", album.title);
        albumData.append("photos",JSON.stringify(album.photos));
        
        for(let i = 0; i < images.length; i++) {
            albumData.append("imageFiles", images[i]);
        }

        for(const imagePath of imagesToBeDeleted) {
            albumData.append("imagesToBeDeleted", imagePath);
        }

        this.http.put<{ message: string, album: Album }>(BACKEND_URL + album.id, albumData)
            .subscribe((responseData) => {
                const newAlbum: Album = {
                    id: responseData.album.id,
                    title: album.title,
                    order: album.order,
                    photos: responseData.album.photos
                }

                const index = this.albums.findIndex(album => album.id === newAlbum.id);
                this.albums[index] = newAlbum;
                console.log(this.albums);
                this.albumsUpdated.next([...this.albums]);
                this.router.navigate(['/dashboard']);
            });
    }

    reorderAlbums(albums: Album[]) {
        console.log("reorder albums");
        const albumsData = new FormData();

        console.log(albums);

        albumsData.append("name", "John");
        albumsData.append("albums", JSON.stringify(albums));

        this.http.put<{ message: string, reorderedAlbums: Album[]}>(BACKEND_URL, albumsData)
            .subscribe((responseData) => {
                console.log(responseData.reorderedAlbums);
                this.albums = responseData.reorderedAlbums;
                console.log(this.albums);
                this.albumsUpdated.next([...this.albums]);
            });
    }
}