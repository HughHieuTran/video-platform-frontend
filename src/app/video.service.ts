import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { FileSystemFileEntry } from 'ngx-file-drop';
import { VideoDto } from './VideoDto';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) {

  }

  public uploadVideo(fileEntry: FileSystemFileEntry): Observable<UploadVideoResponse> {
    return fileEntry.file((file => {
      //const userId = this.authService.getUserId();
      const fd = new FormData();
      fd.append("file", file, file.name);
   //   fd.append("userId", userId !== null ? userId : '');
      return this.httpClient.post<UploadVideoResponse>('http://localhost:8080/api/video/upload', fd,
        {
          headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        });
    }))
  }

  uploadThumbnail(selectedFile: File, videoId: string): Observable<string> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    fd.append('videoId', videoId);
    return this.httpClient.post('http://localhost:8080/api/video/thumbnail/upload', fd,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token')),
        responseType: 'text'
      });
  }

  public getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>("http://localhost:8080/api/video/" + videoId);
  }
}
