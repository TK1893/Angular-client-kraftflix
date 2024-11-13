// src\app\user-profile\user-profile.component.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
// Imports Angular core classes: Component, OnInit for lifecycle hooks, Injectable to mark services, and Input for parent-to-child data binding
import { Component, OnInit, Injectable, Input } from '@angular/core';
// Service that handles API interactions related to user and movie data
import { FetchApiDataService } from '../fetch-api-data.service';
// Angular Material Dialog component for displaying modal dialogs
import { MatDialog } from '@angular/material/dialog';
// Angular Material Snackbar for displaying brief messages in pop-up style at the bottom of the screen
import { MatSnackBar } from '@angular/material/snack-bar';
// Angular Router for handling route navigation after actions
import { Router } from '@angular/router';
// Navbar component reference, used for handling user logout upon profile deletion
import { NavbarComponent } from '../navbar/navbar.component';

// COMPONENT-CONFIGURATION
// ----------------------------------------------------------------------------------------------------------
/**
 * Component for displaying and managing user profile information.
 * It interacts with the FetchApiDataService to retrieve and modify user data and favorites.
 */
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
  /**
   * Initializes component dependencies and services.
   * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
   * @param {NavbarComponent} navigationBar - Navbar component reference for handling navigation
   * @param {MatSnackBar} snackBar - Material Snackbar for displaying messages
   * @param {MatDialog} dialog - Material Dialog for modal windows
   * @param {Router} router - Angular Router for navigation
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public navigationBar: NavbarComponent,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  //  VARIABLES  /////////////////////////////
  /**
   * Array to store all movies retrieved from the API.
   * Used to populate the user's list of available movies.
   */
  movies: any[] = [];
  /**
   * User data retrieved from the API.
   * Contains user-specific data such as username and email.
   */
  user: any = {};
  /**
   * Array of IDs of the user's favorite movies.
   * Used to match against available movies for marking favorites.
   */
  favMovies: any[] = [];
  /**
   * Array of favorite movie objects with full details.
   * Populated based on IDs in `favMovies`.
   */
  favMoviesObjects: any[] = [];

  // @-INPUT-DECORATOR /////////////////////////////
  /**
   * allows the parent component to pass data (userData) to the child component.
   */
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
  };

  //  NG-ON-INIT  /////////////////////////////
  /**
   * Angular lifecycle hook.
   *
   * Called when the component is initialized.
   *
   * It invokes `getAPIMovies()` and `getAPIUser()` to load the movies and user data.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getAPIMovies();
    this.getAPIUser();
  }

  // METHODS
  // ----------------------------------------------------------------------------------------------------------

  // INITIALIZE-FAVORITES /////////////////////////////
  /**
   * Initializes the user's favorite movies after data retrieval.
   * Ensures favorite movies list is only populated when both movies and favorite IDs are available.
   */
  initializeFavorites(): void {
    // Ensure both movies and favMovies are loaded before setting favMoviesObjects
    if (this.movies.length > 0 && this.favMovies.length > 0) {
      this.setFavoriteMoviesObjects();
    }
  }

  // SET-FAVORITE-MOVIES-OBJECTS /////////////////////////////
  /**
   * Populates the favorite movie objects list based on movie IDs.
   * Matches movies in the general list with those marked as favorites.
   */
  setFavoriteMoviesObjects(): void {
    // Filter the movies array based on the IDs in favMovies array
    this.favMoviesObjects = this.movies.filter((movie) =>
      this.favMovies.includes(movie._id)
    );
    console.log('Favorite Movies Objects:', this.favMoviesObjects);
  }

  // GET-API-MOVIES  /////////////////////////////
  /**
   * Retrieves all movies from the API.
   * Saves the data in `movies` and initializes favorites list.
   */
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
  /**
   * Retrieves user data from the API and sets user details.
   * Populates username, email, and favorite movies data for the user.
   */
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
  /**
   * Checks if a movie is in the user's favorites list.
   * @param movieID - The ID of the movie to check.
   * @returns `true` if the movie is a favorite, otherwise `false`.
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
   * Adds a movie to the user's favorites.
   * @param movieID - The ID of the movie to add.
   */
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
  /**
   * Removes a movie from the user's favorites.
   * @param movieID - The ID of the movie to remove.
   */
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

  // USER ACCOUNT MANAGEMENT *******************************************************

  // DELETE-USER-PROFILE /////////////////////////////
  /**
   * Deletes the user's profile after confirmation.
   * Prompts for confirmation before calling API to delete profile.
   */
  deleteUserProfile(): void {
    const userToDelete = this.user.Username;
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.fetchApiData.deleteUser(userToDelete).subscribe({
        next: (response) => {
          console.log('User successfully deleted:', response);
          this.snackBar.open(
            'Your profile has been successfully deleted!',
            'OK',
            {
              duration: 2000,
            }
          );
          this.navigationBar.logoutUser();
        },

        error: (error) => {
          console.error('Error deleting profile: ', error);
          this.snackBar.open(
            'Error deleting profile - Please try again',
            'OK',
            {
              duration: 2000,
            }
          );
        },
      });
    }
  }

  // UPDATE-USER-PROFILE  /////////////////////////////
  /**
   * Updates the user's profile with provided details.
   * Requires all fields (`Username`, `Password`, `Email`) to be filled before submission.
   */
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
        this.snackBar.open('Error updating profile - Please try again', 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
