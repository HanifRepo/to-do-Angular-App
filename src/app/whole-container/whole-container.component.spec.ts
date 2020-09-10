import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeContainerComponent } from './whole-container.component';

describe('WholeContainerComponent', () => {
  let component: WholeContainerComponent;
  let fixture: ComponentFixture<WholeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
