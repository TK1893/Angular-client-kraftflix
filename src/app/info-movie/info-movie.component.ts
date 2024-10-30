import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-movie',
  templateUrl: './info-movie.component.html',
  styleUrl: './info-movie.component.scss',
})
export class InfoMovieComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
