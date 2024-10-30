import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGenreComponent } from './info-genre.component';

describe('InfoGenreComponent', () => {
  let component: InfoGenreComponent;
  let fixture: ComponentFixture<InfoGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoGenreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
