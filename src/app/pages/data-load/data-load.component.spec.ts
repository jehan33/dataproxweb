import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoadComponent } from './data-load.component';

describe('DataLoadComponent', () => {
  let component: DataLoadComponent;
  let fixture: ComponentFixture<DataLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataLoadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
