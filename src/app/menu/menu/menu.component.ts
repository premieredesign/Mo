import {Component, Input, OnInit} from '@angular/core';
import {UtilityService} from '../../utility/utility.service';
import { MENU } from './menu.types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private utilityService: UtilityService) { }

  @Input() receiveNotification: any;
  public menu: MENU.NOTIFICATIONS;

  ngOnInit() {
    this.utilityService.onChangeState.pipe().subscribe((menu) => {
      console.log('this is incoming', menu.state);
      // this.menu.TRIGGERMENU = menu.showMenu;
    });
  }

  public handleIncoming(e): void {
    console.log('incoming', e);
    this.utilityService.onChangeState.pipe().subscribe((k) => {
      console.log('this is incoming', k);
    });
  }

}
