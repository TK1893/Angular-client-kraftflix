// src\app\movie-card\movie-card.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InfoDirectorComponent } from '../info-director/info-director.component';
import { InfoGenreComponent } from '../info-genre/info-genre.component';
import { InfoMovieComponent } from '../info-movie/info-movie.component';

// COMPONENT CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * The `MovieCardComponent` is responsible for displaying and managing movie cards.
 * It allows users to add and remove movies from their favorites, as well as view detailed information about movies, directors, and genres.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class MovieCardComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  /**
   * The constructor initializes the `MovieCardComponent` with the required dependencies:
   * - `FetchApiDataService` for fetching movie and user data from the API.
   * - `MatSnackBar` for showing notifications.
   * - `MatDialog` for opening modals that display additional movie or user information.
   *
   * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   * @param {MatDialog} dialog - Service for opening dialogs.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  //  VARIABLES  /////////////////////////////
  /**
   * A list (Array) of movies retrieved from the API.
   */
  movies: any[] = [];
  /**
   * The current user whose data is fetched from the API.
   */
  user: any = {}; //
  /**
   * A list (Array) of the user's favorite movies, fetched from the user's data.
   */
  favMovies: any[] = [];

  //  NG-ON-INIT /////////////////////////////
  /**
   * Called when the component is initialized. It invokes `getAPIMovies()` and `getAPIUser()` to load the movies and user data.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getAPIMovies();
    this.getAPIUser();
  }

  // GET-API-MOVIES  /////////////////////////////
  /**
   * Fetches all movies from the API and stores them in the `movies` variable.
   * @returns {void}
   */
  getAPIMovies(): void {
    // fetch api-movies & save it in [movies]-variable
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('this.movies: ', this.movies);
      return this.movies;
    });
  }

  // GET-API-USER  /////////////////////////////
  /**
   * Fetches the user data from the API and stores it in the `user` variable.
   * The user's favorite movies are also stored in `favMovies`.
   * @returns {void}
   */
  getAPIUser(): void {
    // fetch api-user & save it in [user]-variable
    this.fetchApiData.getSingleUser().subscribe((resp: any) => {
      this.user = resp;
      this.favMovies = this.user.FavoriteMovies;
      console.log('this.user: ', this.user);
      console.log('this.favMovies: ', this.favMovies);
      return this.user;
    });
  }

  // IS-FAVORITE ?? (CHECK)  /////////////////////////////
  /**
   * Checks if a movie is part of the user's favorite movies.
   * @param {string} movieID - The ID of the movie to check.
   * @returns {boolean} - Returns `true` if the movie is a favorite, otherwise `false`.
   */
  isFavorite(movieID: string): boolean {
    console.log(
      'Ist er ein Favorite?: ',
      this.user.FavoriteMovies.indexOf(movieID) >= 0
    );
    return this.user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  // ADD & DELETE FAVORITE MOVIES *******************************************************

  //  ADD-FAVORITE  /////////////////////////////
  /**
   * Adds a movie to the user's list of favorite movies.
   * @param {string} movieID - The ID of the movie to be added to favorites.
   * @returns {void}
   */
  addFavorite(movieID: string): void {
    this.fetchApiData.addFavoriteMovie(movieID).subscribe({
      next: (response) => {
        console.log('Erfolgreich hinzugefügt:', response);
        this.getAPIUser();
        this.snackBar.open(
          'The movie has been successfully added to your favorites!',
          'OK',
          {
            duration: 2000,
          }
        );
      },
      error: (error) => {
        console.error('Fehler beim Hinzufügen des Films:', error);
        this.snackBar.open(
          'Adding the favorite movie failed - Please try again!',
          'OK',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  //  DELETE-FAVORITE  /////////////////////////////
  /**
   * Removes a movie from the user's list of favorite movies.
   * @param {string} movieID - The ID of the movie to be removed from favorites.
   * @returns {void}
   */
  deleteFavorite(movieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe({
      next: (response) => {
        console.log('Erfolgreich gelöscht:', response);
        this.getAPIUser();
        this.snackBar.open(
          'The movie has been successfully removed from your favorites!',
          'OK',
          {
            duration: 2000,
          }
        );
      },
      error: (error) => {
        console.error('Fehler beim Löschen des Films:', error);
        this.snackBar.open(
          'Deleting the favorite movie failed - Please try again!',
          'OK',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  //  OPEN-DIALOG-FUNCTIONS  *******************************************************

  // OPEN-DIRECTOR-DIALOG  /////////////////////////////
  /**
   * Opens a dialog displaying information about a director.
   * @param {string} name - The name of the director.
   * @param {string} bio - A brief biography of the director.
   * @returns {void}
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(InfoDirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      // Assigning the dialog a width
      width: '400px',
    });
  }

  // OPEN-GENRE-DIALOG  /////////////////////////////
  /**
   * Opens a dialog displaying information about a movie genre.
   * @param {string} name - The name of the genre.
   * @param {string} description - A brief description of the genre.
   * @returns {void}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(InfoGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  // OPEN DESCRIPTION DIALOG /////////////////////////////
  /**
   * Opens a dialog displaying a detailed description of a movie.
   * @param {string} description - The description of the movie.
   * @param {string} title - The title of the movie.
   * @returns {void}
   */
  openDescriptionDialog(description: string, title: string): void {
    this.dialog.open(InfoMovieComponent, {
      data: {
        Description: description,
        Title: title,
      },
      width: '400px',
    });
  }
}
