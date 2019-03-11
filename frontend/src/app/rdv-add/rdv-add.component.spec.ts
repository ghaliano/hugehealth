import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvAddComponent } from './rdv-add.component';

describe('RdvAddComponent', () => {
  let component: RdvAddComponent;
  let fixture: ComponentFixture<RdvAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdvAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
