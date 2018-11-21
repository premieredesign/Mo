import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mospirit',
  templateUrl: './mospirit.component.html',
  styleUrls: ['./mospirit.component.scss']
})
export class MospiritComponent implements OnInit {
  public toggle: boolean;

  constructor() { }

  ngOnInit() {
  }

  public showMenu(): void {
    this.toggle = !this.toggle;
  }

}
