// src\app\user-profile\user-profile.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
import { Component, OnInit, Injectable, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
/**
 * INJECTABLE-DECORATOR
 * ----------------------------------------------------------------------------------------------------------
 * marks this class as a service
 * allows the service to be available throughout the app (without declaring it in a module)
 */
@Injectable({
  providedIn: 'root',
})

// COMPONENT
// ----------------------------------------------------------------------------------------------------------
export class UserProfileComponent implements OnInit {
  //
  //  CONSTRUCTOR /////////////////////////////
  constructor(
    public fetchApiData: FetchApiDataService,
    public navigationBar: NavbarComponent,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  //  VARIABLES  /////////////////////////////
  movies: any[] = [];
  user: any = {};
  favMovies: any[] = [];
  favMoviesObjects: any[] = [];

  /**  @-INPUT-DECORATOR /////////////////////////////
   * allows the parent component to pass data (userData) to the child component.
   */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
  };

  //  NG-ON-INIT  /////////////////////////////
  ngOnInit(): void {
    this.getAPIMovies();
    this.getAPIUser();
  }

  // INITIALIZE-FAVORITES /////////////////////////////
  initializeFavorites(): void {
    // Ensure both movies and favMovies are loaded before setting favMoviesObjects
    if (this.movies.length > 0 && this.favMovies.length > 0) {
      this.setFavoriteMoviesObjects();
    }
  }

  // SET-FAVORITE-MOVIES-OBJECTS /////////////////////////////
  setFavoriteMoviesObjects(): void {
    // Filter the movies array based on the IDs in favMovies array
    this.favMoviesObjects = this.movies.filter((movie) =>
      this.favMovies.includes(movie._id)
    );
    console.log('Favorite Movies Objects:', this.favMoviesObjects);
  }

  // GET-API-MOVIES  /////////////////////////////
  getAPIMovies(): void {
    // fetch api-movies & save it in [movies]-variable
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('this.movies: ', this.movies);
      this.initializeFavorites();
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
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.initializeFavorites();
      return this.user;
    });
  }

  // IS-MOVIE-FAVORITE-CHECK-?  /////////////////////////////
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
        this.getAPIUser(); // Aktualisiere die Benutzerdaten
        this.snackBar.open('Movie successfully deleted from favorites!', 'OK', {
          duration: 2000,
        });
        // Aktualisiere die Favoriten-Liste im UI
        this.setFavoriteMoviesObjects();
      },
      error: (error) => {
        console.error('Fehler beim Hinzufügen des Films:', error);
        this.snackBar.open(
          'Error deleting movie from favorites - please try again!',
          'OK',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  // DELETE-FAVORITE /////////////////////////////
  deleteFavorite(movieID: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe({
      next: (response) => {
        console.log('Erfolgreich gelöscht:', response);

        // Aktualisiere die Favoritenliste des Benutzers
        this.getAPIUser();

        // Entferne den Film direkt aus dem favMoviesObjects-Array
        this.favMoviesObjects = this.favMoviesObjects.filter(
          (movie) => movie._id !== movieID
        );

        // Falls favMoviesObjects leer ist, setze es explizit auf ein neues leeres Array
        if (this.favMoviesObjects.length === 0) {
          this.favMoviesObjects = [];
        }

        this.snackBar.open('Movie successfully deleted from favorites!', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.error('Fehler beim Löschen des Films:', error);
        this.snackBar.open('Failed to delete - please try again', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  // DELETE USER *******************************************************

  // DELETE-USER-PROFILE /////////////////////////////
  deleteUserProfile(): void {
    const userToDelete = this.user.Username;
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.fetchApiData.deleteUser(userToDelete).subscribe({
        next: (response) => {
          console.log('User erfolgreich gelöscht:', response);
          this.snackBar.open('Film erfolgreich aus Favoriten entfernt!', 'OK', {
            duration: 2000,
          });
          this.navigationBar.logoutUser();
        },

        error: (error) => {
          console.error('Fehler beim Löschen des Films:', error);
          this.snackBar.open('Fehler beim Löschen des Films', 'OK', {
            duration: 2000,
          });
        },
      });
    }
  }

  // UPDATE USER *******************************************************

  // UPDATE-USER-PROFILE
  updateUserProfile(): void {
    if (
      !this.userData.Username ||
      !this.userData.Password ||
      !this.userData.Email
    ) {
      this.snackBar.open('Please fill all required fields.', 'OK', {
        duration: 3000,
      });
      return;
    }

    this.fetchApiData.editUser(this.userData).subscribe({
      next: (result) => {
        console.log('Profile updated successfully:', result);
        this.snackBar.open(
          'Your profile has been successfully updated!',
          'OK',
          {
            duration: 3000,
          }
        );
        // Aktualisiert die Benutzerinformationen im UI
        this.getAPIUser();
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open(
          'Your profile has been successfully updated!',
          'OK',
          {
            duration: 3000,
          }
        );
      },
    });
  }
}
