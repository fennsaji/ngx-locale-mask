import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLocaleMaskComponent } from './ngx-locale-mask.component';

describe('NgxLocaleMaskComponent', () => {
  let component: NgxLocaleMaskComponent;
  let fixture: ComponentFixture<NgxLocaleMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxLocaleMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxLocaleMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
