import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilityService} from '../utility/utility.service';
import { trigger,
  state,
  style,
  stagger,
  animate,
  query,
  transition} from '@angular/animations';
import * as _ from 'lodash';


declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('menuAnimation', [
      state('slideDown', style({
        transform: 'translateY(300px) scale(0.1)',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('fade', style({
        // transform: 'translateY(-500px) scale(-11)',
        // opacity: 0.95,
        // zIndex: 4
      })),
      transition('* <=> *', animate('500ms ease-in-out'))
    ]),
    trigger('photosAnimation', [
      state('photos', style({})),
      transition('* => *', [
        query('img', style({
          position: 'relative',
          zIndex: -18,
          opacity: 0,
        })),
        query('img',
          stagger('100ms ease-in-out', [
            animate('600ms ease-in-out', style({
              opacity: 1,
              transform: 'scale(1.1)'
            })),
            animate('600ms ease-in-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ]))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  public moriahFits: [any];
  public moriahSweets: [any];
  public state = '';
  public stateFade = '';
  public picture = 'small';
  public show = true;
  public toggleMenu = false;
  public times = 5;
  public counter = 0;


  constructor(private utiltiyService: UtilityService) { }

  @Output() sendNotification: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.getMoPics();
  }

  public animateMenu(e): void {
    console.log('you clicked here', e);
  }

  public getMoPics(): void {
    this.utiltiyService.getByUrl('api/home/data')
      .subscribe((DATA: any) => {
        console.log(DATA);
        this.moriahFits = DATA.PICS.MOFITS;
        this.moriahSweets = DATA.PICS.MOSWEETS;
      });


    let counter = 0;
    window.setInterval(() => {
      const allOfThem = _.union(this.moriahSweets, this.moriahFits);
      _.each(allOfThem, (val, key) => {
        if (key === counter) {
          this.animateImg(val.VALUE);
        }
      });
      counter++;
    }, 30000);
  }

  public showMenu(): void {
    this.state = (this.state === 'slideDown' ? null : 'slideDown');
    this.sendNotification.emit({
      state: this.state,
      triggerMenu: ''
    });

    this.utiltiyService.onChangeState.next({
      state: this.state,
      triggerMenu: ''
    });

    this.show = !this.show;
    this.toggleMenu = !this.toggleMenu;
  }

  public animateImg(img): void {
    console.log(img);
    if (!this.toggleMenu) {
      this.moriahFits.push(img);
    }
  }

  public onRepeat(e) {
    console.log('it is done', e);
    e = {
      phaseName: 'start'
    }
    if (this.counter < this.times) {
      this.picture = (this.picture === 'flipImg' ? 'flipImg' : 'flipImg');
    }
    this.counter++;
    console.log(e);
  }
}
