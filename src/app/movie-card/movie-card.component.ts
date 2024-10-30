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
  /** CONSTRUCTOR
   * @description Called when creating an instance of the class
   * @param fetchApiData
   * @param snackBar
   * @param dialog
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  // VARIABLES
  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = [];
  isFavMovie: boolean = false;
  userData = { Username: '', FavoriteMovies: [] };

  // ngOnInit
  ngOnInit(): void {
    this.getMoviesfromAPI();
    this.getLocalUser();
    this.getFavMovies();
    // this.testFunction();
  }

  /**  GET-ALL-MOVIES
   * ******************
   *  fetch movies & save it in "this.movies" variable */
  getMoviesfromAPI(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('this.movies: ', this.movies);
      return this.movies;
    });
  }

  // GET-LOCAL-STORAGE-USER
  getLocalUser(): any {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('this.user (from local storage): ', this.user);
    return this.user;
  }

  // GET-FAV-MOVIES
  getFavMovies(): void {
    this.user = this.getLocalUser();
    // console.log('this.user: ', this.user);
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.userData.Username = this.user.Username;
    // console.log(
    //   'this.userData.FavoriteMovies: ',
    //   this.userData.FavoriteMovies,
    //   'this.userData: ',
    //   this.userData
    // );
    this.FavoriteMovies = this.user.FavoriteMovies;
    // console.log('this.FavoriteMovies: ', this.FavoriteMovies);
  }

  /**  IS-FAVORITE-MOVIE
   ********************** */
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  /**  ADD-FAV-MOVIES
   ********************** */
  addFavMovies(movie: string): void {
    this.user = this.getLocalUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavoriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  /**  REMOVE-FAV-MOVIES
   **************************/
  removeFavMovies(movie: any): void {
    this.user = this.getLocalUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavoriteMovie(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  // Testfunktion
  testFunction(): void {}

  // //  GET-FAV-MOVIES
  // getFavMovies(): void {
  //   this.user = this.fetchApiData.getSingleUser();
  //   this.userData.FavoriteMovies = this.user.FavoriteMovies;
  //   this.FavoriteMovies = this.user.FavoriteMovies;
  //   console.log('Users fav movies', this.FavoriteMovies);
  // }

  // DIALOG FUNCTIONS
  // ************************************************************

  // OPEN-DIRECTOR-DIALOG
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
  // OPEN-GENRE-DIALOG
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(InfoGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }
  // OPEN-DESCRIPTION-DIALOG
  openDescriptionDialog(description: string): void {
    this.dialog.open(InfoMovieComponent, {
      data: {
        Description: description,
      },
      width: '400px',
    });
  }
}
