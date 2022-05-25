import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbusComponent } from './showbus.component';

describe('ShowbusComponent', () => {
  let component: ShowbusComponent;
  let fixture: ComponentFixture<ShowbusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowbusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
