import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {BehaviorSubject, Subscription} from "rxjs";
import { VideoService } from '../video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {
  saveVideoForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('')
  tags: string[] = [];
  removable = true;
  addOnBlur = true;
  selectable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedFile!: File;
  selectedFileName = '';
  uploadThumbnailSubscription!: Subscription;
  videoId!: string;
  showVideoUrl = false;
  fileUploaded!: boolean ;
  thumbnailUploaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private videoService: VideoService, private route: ActivatedRoute, private matSnackBar: MatSnackBar) {
    this.videoId = this.route.snapshot.params['videoId'];
    this.saveVideoForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    event.chipInput!.clear();
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
  }

  onUpload() {
    this.uploadThumbnailSubscription = this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(data => {
        this.thumbnailUploaded.subscribe(() => {
          this.matSnackBar.open("Thumbnail Uploaded Successfully", "OK");
          this.fileUploaded = true;
        });
      });
  }
}
