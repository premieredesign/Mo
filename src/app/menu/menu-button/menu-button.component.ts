import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit {
  public menuText = 'Menu';
  public changeText = true;
  @Output() handleMenu: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  public triggerMenu(): void {
    this.handleMenu.emit();
    this.changeText ? this.menuText = 'Return' : this.menuText = 'Menu';
    this.changeText = !this.changeText;
  }
}
