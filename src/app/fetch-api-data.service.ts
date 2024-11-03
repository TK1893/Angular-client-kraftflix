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
// **************************************************************************************

// DECLARING-API-URL  /////////////////////////////  (for providing data for the client app)
const apiUrl = 'https://kraftflix-api-d019e99d109c.herokuapp.com/';

/**
 * INJECTABLE-DECORATOR
 * ----------------------------------------------------------------------------------------------------------
 * marks this class as a service
 * allows the service to be available throughout the app (without declaring it in a module)
 */
@Injectable({
  providedIn: 'root',
})

// COMPONENT ( SERVICE CLASS )
// ----------------------------------------------------------------------------------------------------------
export class FetchApiDataService {
  //
  //  CONSTRUCTOR /////////////////////////////  (The constructor injects dependencies)
  constructor(private http: HttpClient) {}
  // Inject the HttpClient module into entire class (to the constructor params)
  // Allows sending HTTP requests
  // making it available via this.http

  // EXTRACT-RESPONSE-DATA (NON-TYPED RESPONSE-EXTRACTION)
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // GET-TOKEN
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // GET-HEADERS
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }

  // USERS-ENDPOINT-OPERATIONS  *******************************************************

  // CREATE-USER  (USER-REGISTRATION)  /////////////////////////////
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
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // EDIT-USER  /////////////////////////////
  public editUser(userDetails: any): Observable<any> {
    return this.http
      .put(`${apiUrl}users/${userDetails.Username}`, userDetails, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE-USER  /////////////////////////////
  public deleteUser(userName: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${userName}`, {
        headers: this.getHeaders(),
        responseType: 'text', // Antwort als Text behandeln, um Parsing-Fehler zu vermeiden
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-SINGLE-USER  /////////////////////////////
  public getSingleUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .get(`${apiUrl}users/${user.Username}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // FAVORITE-MOVIE-OPERATIONS ( ADD-&-DELETE )  *******************************************************

  // ADD-FAVORITE-MOVIE  /////////////////////////////
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
  public deleteFavoriteMovie(moviesID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(`${apiUrl}users/${user.Username}/movies/${moviesID}`, {
        headers: this.getHeaders(),
        responseType: 'text', // Antwort als reinen Text behandeln
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // MOVIES-ENDPOINT-OPERATIONS  *******************************************************

  // GET-ALL-MOVIES  /////////////////////////////
  public getAllMovies(): Observable<any> {
    return this.http
      .get(`${apiUrl}movies`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-SINGLE-MOVIE  /////////////////////////////
  public getSingleMovie(title: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/${title}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-DIRECTOR  /////////////////////////////
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/directors/${directorName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-GENRE  /////////////////////////////
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/genres/${genreName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ERROR-HANDLING  *******************************************************

  // HANDLE-ERROR  /////////////////////////////
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
