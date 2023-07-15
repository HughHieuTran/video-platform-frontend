import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { VideoService } from '../video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  public files: NgxFileDropEntry[] = [];
  fileUploaded: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;

  constructor(private videoService: VideoService, private router: Router) {

  }


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileUploaded = true;
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  uploadVideo() {
    if (this.fileEntry !== undefined) {
      this.videoService.uploadVideo(this.fileEntry).subscribe(data => {
        console.log(data.videoId)
        this.router.navigateByUrl("/save-video-details/" + data.videoId);
      })
    }
  }
}
