import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MosweetsComponent } from './mosweets.component';

describe('MosweetsComponent', () => {
  let component: MosweetsComponent;
  let fixture: ComponentFixture<MosweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MosweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MosweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
