import { Component, OnInit } from '@angular/core';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {UtilityService} from '../utility/utility.service';
import {MOPPREPS} from './mopreps.types';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-mopreps',
  templateUrl: './mopreps.component.html',
  styleUrls: ['./mopreps.component.scss']
})
export class MoprepsComponent implements OnInit {
  public hasStart = false;
  public hasStartNow = true;
  public hasItem = true;
  public selectedItems: Array<any> = [];
  public counter = 0;
  public toggle: boolean;
  public moPreps: MOPPREPS.MEALPODS;
  public customerId: string;

  constructor(private route: ActivatedRoute, private  utilityService: UtilityService) { }

  ngOnInit() {
    this.getMoPreps();
    this.route.params.subscribe((params) => {
      console.log('The params', params);
      localStorage.setItem('profile-customer', JSON.stringify(params));
    });
  }


  public getMoPreps(): void {
    this.utilityService.getByUrl('api/moriah/data').pipe().subscribe((DATA) => {
      this.moPreps = DATA.FIELDS.MOPREPS;
      console.log(DATA);
    });
  }

  public handleItemSelected(items: any): any {
    this.counter += 1;
    this.selectedItems.push(items);
    console.log(this.selectedItems);
  }

  public getTotal(): void {
    this.selectedItems.map((item) => {
      console.log(item.ID);
    });
  }

  public handeShow(e): void {
    if (e.type === 'mouseenter') {
      this.hasStart = true;
      this.hasStartNow = false;
    } else {
      this.hasStart = false;
      this.hasStartNow = true;
    }
  }

  public showMenu(): void {
    this.toggle = !this.toggle;
  }
}
