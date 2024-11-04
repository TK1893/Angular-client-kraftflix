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

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
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
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  //  VARIABLES  /////////////////////////////
  movies: any[] = [];
  user: any = {};
  favMovies: any[] = [];

  //  ngOnInit  /////////////////////////////
  ngOnInit(): void {
    this.getAPIMovies();
    this.getAPIUser();
  }

  // GET-API-MOVIES  /////////////////////////////
  getAPIMovies(): void {
    // fetch api-movies & save it in [movies]-variable
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('this.movies: ', this.movies);
      return this.movies;
    });
  }

  // GET-API-USER  /////////////////////////////
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
  isFavorite(movieID: string): boolean {
    console.log(
      'Ist er ein Favorite?: ',
      this.user.FavoriteMovies.indexOf(movieID) >= 0
    );
    return this.user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  // ADD & DELETE FAVORITE MOVIES *******************************************************

  //  ADD-FAVORITE  /////////////////////////////
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
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(InfoGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  // OPEN-DESCRIPTION-DIALOG  /////////////////////////////
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
