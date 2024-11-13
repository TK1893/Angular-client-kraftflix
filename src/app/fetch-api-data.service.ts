// src\app\fetch-api-data.service.ts

// IMPORTS
// ----------------------------------------------------------------------------------------------------------
// INJECTABLE OPERATOR  ///////////////////////////// (for marking class as a service that can be injected into other parts of the app)
import { Injectable } from '@angular/core';
// RXJS  /////////////////////////////
import { catchError, map } from 'rxjs/operators';
// catchError: Operator for Error-Handling during Async Operations
// map: Operator for returning errors when an HTTP request fails.
import { Observable, throwError } from 'rxjs'; // Used to handle data streams that are returned from HTTP requests.
// HTTP  /////////////////////////////
import {
  HttpClient, // Allows sending HTTP requests
  HttpHeaders, // Helps set custom headers for HTTP requests (e.g., for authentication)
  HttpErrorResponse, // Represents error objects that occur when making HTTP requests.
} from '@angular/common/http';

// BASE-SETTINGS
// -------------------------------------------------------------------------------------------

// BASE-API-URL /////////////////////////////
/**
 * Declaring Base URL for the API that provides data for the client app.
 */
const apiUrl = 'https://kraftflix-api-d019e99d109c.herokuapp.com/';

/**
 * FetchApiDataService
 * Service for fetching data from the API.
 * Handles CRUD operations for user data, movies, genres, and directors, and error handling.
 */
@Injectable({
  // the INJECTABLE-DECORATOR marks this class as a service & allows the service to be available throughout the app (without declaring it in a module)
  providedIn: 'root',
})

// COMPONENT ( SERVICE CLASS )
// ----------------------------------------------------------------------------------------------------------
export class FetchApiDataService {
  //
  //  CONSTRUCTOR /////////////////////////////
  /**
   * Constructor that injects the HttpClient dependency to enable HTTP requests.
   *
   * Making it available via this.http
   * @param {HttpClient} http - Angular's HttpClient used to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  // EXTRACT-RESPONSE-DATA (NON-TYPED RESPONSE-EXTRACTION) /////////////////////////////
  /**
   * Extracts response data from an HTTP response.
   * @param {any} res - The response object from the HTTP request.
   * @returns {any} - The extracted data or an empty object if no data is present.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // GET-TOKEN  /////////////////////////////
  /**
   * Retrieves the authentication token from local storage.
   *
   * @returns {string | null} - The token as a string if it exists, or null if not.
   */
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // GET-HEADERS  /////////////////////////////
  /**
   * Generates HTTP headers with the authorization token for requests requiring authentication.
   *
   * @returns {HttpHeaders} - A new set of HTTP headers with the authorization token included.
   */
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }

  // METHODS
  // ----------------------------------------------------------------------------------------------------------

  // USERS-ENDPOINT-OPERATIONS  *******************************************************************

  // CREATE-USER  (USER-REGISTRATION)  /////////////////////////////
  /**
   * Registers a new user by sending user details to the API.
   *
   * @param {any} userDetails - An object containing user details such as username, password, email, and birthday.
   * @returns {Observable<any>} - An observable containing the API response upon registration.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return (
      this.http
        .post(apiUrl + 'users', userDetails)
        // .post(`${apiUrl}/users/`, userDetails) // uses Angular's HttpClient for sending a POST-request to the API. The userDetails object is sent along with the request.
        // returns an Observable emitting the server response when the request is completed.
        .pipe(catchError(this.handleError))
    ); // The pipe operator is used to add additional processing steps. In this case, the catchError operator is used to catch possible errors.
  }

  // LOGIN-USER  /////////////////////////////
  /**
   * Logs in a user by sending their credentials to the API.
   *
   * @param {any} userDetails - An object containing the user's login credentials.
   * @returns {Observable<any>} - An observable containing the API response upon login.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // EDIT-USER  /////////////////////////////
  /**
   * Updates the details of an existing user.
   *
   * @param {any} userDetails - An object containing the updated user details.
   * @returns {Observable<any>} - An observable containing the API response upon updating the user.
   */
  public editUser(userDetails: any): Observable<any> {
    return this.http
      .put(`${apiUrl}users/${userDetails.Username}`, userDetails, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE-USER  /////////////////////////////
  /**
   * Deletes a user by username from the database.
   *
   * @param {string} userName - The username of the user to delete.
   * @returns {Observable<any>} - An observable with the server's response upon deletion.
   */
  public deleteUser(userName: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${userName}`, {
        headers: this.getHeaders(),
        responseType: 'text', // Antwort als Text behandeln, um Parsing-Fehler zu vermeiden
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-SINGLE-USER  /////////////////////////////
  /**
   * Retrieves a single user's information.
   *
   * @returns {Observable<any>} - An observable with the user data fetched from the API.
   */
  public getSingleUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .get(`${apiUrl}users/${user.Username}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // FAVORITE-MOVIE-OPERATIONS ( ADD-&-DELETE )  ***************************************************

  // ADD-FAVORITE-MOVIE  /////////////////////////////
  /**
   * Adds a movie to a user's list of favorites.
   *
   * @param {string} moviesID - The ID of the movie to add to favorites.
   * @returns {Observable<any>} - An observable with the server's response upon adding the favorite.
   */
  public addFavoriteMovie(moviesID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user);
    console.log(moviesID);
    return this.http
      .post(
        `${apiUrl}users/${user.Username}/movies/${moviesID}`,
        {},
        {
          headers: this.getHeaders(),
          responseType: 'text', // Antwort als reinen Text behandeln
        }
      )
      .pipe(
        map((response) => {
          // Keine JSON-Konvertierung, einfach Text weitergeben
          console.log('Serverantwort:', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // DELETE-FAVORITE-MOVIE  /////////////////////////////
  /**
   * Deletes a movie from a user's list of favorites.
   *
   * @param {string} moviesID - The ID of the movie to remove from favorites.
   * @returns {Observable<any>} - An observable with the server's response upon removing the favorite.
   */
  public deleteFavoriteMovie(moviesID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(`${apiUrl}users/${user.Username}/movies/${moviesID}`, {
        headers: this.getHeaders(),
        responseType: 'text', // Antwort als reinen Text behandeln
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // MOVIES-ENDPOINT-OPERATIONS  ******************************************************************

  // GET-ALL-MOVIES  /////////////////////////////
  /**
   * Retrieves the complete list of movies from the API.
   *
   * @returns {Observable<any>} - An observable containing an array of movies.
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(`${apiUrl}movies`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-SINGLE-MOVIE  /////////////////////////////
  /**
   * Retrieves details of a single movie by title.
   *
   * @param {string} title - The title of the movie to fetch.
   * @returns {Observable<any>} - An observable containing movie details.
   */
  public getSingleMovie(title: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-DIRECTOR  /////////////////////////////
  /**
   * Retrieves details of a director by name.
   *
   * @param {string} directorName - The name of the director.
   * @returns {Observable<any>} - An observable containing the director's details.
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/directors/${directorName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-GENRE  /////////////////////////////
  /**
   * Retrieves details of a genre by name.
   *
   * @param {string} genreName - The name of the genre.
   * @returns {Observable<any>} - An observable containing the genre's details.
   */
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/genres/${genreName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ERROR-HANDLING  *******************************************************

  // HANDLE-ERROR  /////////////////////////////
  /**
   * Handles HTTP errors that occur during API requests.
   *
   * @param {HttpErrorResponse} error - The error object representing the HTTP error.
   * @returns {Observable<never>} - An observable that throws an error with a message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
