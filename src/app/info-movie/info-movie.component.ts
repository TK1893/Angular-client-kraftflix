// src\app\info-movie\info-movie.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
/**
 * Imports the necessary modules and decorators from Angular and Angular Material.
 * - `Component` is used to declare the class as an Angular component.
 * - `OnInit` is an interface that defines the method for initializing the component.
 * - `Inject` and `MAT_DIALOG_DATA` are used to inject data into the component, specifically for dialog components.
 */
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
/**
 * This component is displayed in a dialog to show details about a movie, including its title and description. *
 */
export class InfoMovieComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  /**
   * The constructor is used to inject dependencies into a class and initialize it:
   * - It initializes an instance of `InfoMovieComponent`.
   * - It injects the data passed to the dialog.
   * - `@Inject` - is a decorator that tells Angular this is a dependency that needs to be injected
   * - `MAT_DIALOG_DATA` - is used pass data into a dialog that is opened using MatDialog
   * @param data - An object containing information about the movie.
   * @param data.Description - The synopsis of the movie.
   * @param data.Title - The title of the movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
      Title: string;
    }
  ) {}

  //  NG-ON-INIT  /////////////////////////////
  /**
   * The `ngOnInit` method is part of the Angular `OnInit` lifecycle hook and is called once when the component is initialized.
   * It is used to perform any initialization logic when the component is loaded.
   * In this case, `ngOnInit` is implemented without any content as no additional initialization is required.
   * @returns void
   */
  ngOnInit(): void {}
}
