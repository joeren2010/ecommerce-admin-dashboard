import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsUpdateComponent } from './meetings-update.component';

describe('MeetingsUpdateComponent', () => {
  let component: MeetingsUpdateComponent;
  let fixture: ComponentFixture<MeetingsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
