// src\app\info-genre\info-genre.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-info-genre',
  templateUrl: './info-genre.component.html',
  styleUrl: './info-genre.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class InfoGenreComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}
  //  ngOnInit  /////////////////////////////
  ngOnInit(): void {}
}
