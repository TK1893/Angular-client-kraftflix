import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDirectorComponent } from './info-director.component';

describe('InfoDirectorComponent', () => {
  let component: InfoDirectorComponent;
  let fixture: ComponentFixture<InfoDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
