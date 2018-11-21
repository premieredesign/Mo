import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../utility/utility.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }
  public toggle: boolean;

  ngOnInit() {
  }

  public showMenu(): void {
    this.toggle = !this.toggle;
  }
}
