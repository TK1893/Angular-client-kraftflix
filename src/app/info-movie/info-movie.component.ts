// src\app\info-movie\info-movie.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-info-movie',
  templateUrl: './info-movie.component.html',
  styleUrl: './info-movie.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class InfoMovieComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
      Title: string;
    }
  ) {}

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {}
}
