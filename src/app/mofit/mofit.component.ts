import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UtilityService} from '../utility/utility.service';
import {MOFIT} from './mofit.types';

@Component({
  selector: 'app-mofit',
  templateUrl: './mofit.component.html',
  styleUrls: ['./mofit.component.scss']
})
export class MofitComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: any;

  public moFits: MOFIT.WORKOUT;
  public toggle: boolean;
  public isClicked = false;
  public isMuted = true;

  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
    this.getMoFits();
  }

  public getMoFits(): void {
    const url = 'api/moriah/data';
    this.utilityService.getByUrl(url).pipe().subscribe((DATA) => {
      this.moFits = DATA.FIELDS.MOFIT;
      console.log(this.moFits);
    });
  }

  public handleVideoSelected(video): void {
    video.controls = true;
    video.muted = false;
  }

  public showMenu(): void {
    this.toggle = !this.toggle;
  }
}
