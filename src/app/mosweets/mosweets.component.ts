import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilityService} from '../utility/utility.service';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {MOSWEETS} from './mosweets.types';


@Component({
  selector: 'app-mosweets',
  templateUrl: './mosweets.component.html',
  styleUrls: ['./mosweets.component.scss']
})
export class MosweetsComponent implements OnInit {

  constructor(private utilityService: UtilityService) { }

  public state: any;
  public toggle: boolean;
  public moSweets: MOSWEETS.SWEETS;

  ngOnInit() {
    this.getMoSweets();
  }

  public getMoSweets(): void {
    this.utilityService.getByUrl('api/moriah/data').pipe().subscribe((DATA) => {
      this.moSweets = DATA.FIELDS.MOSWEETS;
      console.log(DATA);
    });
  }

  public showMenu(): void {
    this.toggle = !this.toggle;
  }

}
