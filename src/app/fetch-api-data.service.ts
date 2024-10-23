// src\app\fetch-api-data.service.ts

// IMPORTS
// **************************************************************************************
import { Injectable } from '@angular/core'; // INJECTABLE OPERATOR (for marking class as a service that can be injected into other parts of the app)
import { catchError, map } from 'rxjs/operators';
// CATCH-ERROR-OPERATOR (for Error-Handling during Async Operations)
// MAP-OPEATOR (Used to return errors when an HTTP request fails.)
import {
  HttpClient, // Allows sending HTTP requests
  HttpHeaders, // Helps set custom headers for HTTP requests (e.g., for authentication)
  HttpErrorResponse, // Represents error objects that occur when making HTTP requests.
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Used to handle data streams that are returned from HTTP requests.

// BASE-SETTINGS
// **************************************************************************************

// DECLARING-API-URL (for providing data for the client app)
const apiUrl = 'https://kraftflix-api-d019e99d109c.herokuapp.com';

// INJECTABLE-DECORATOR (Allows the service to be available throughout the app)
@Injectable({
  //  marks this class as a service,
  providedIn: 'root', // makes cervice be available throughout the app without declaring it in a module.
})

// SERVICE CLASS
// **************************************************************************************
export class FetchApiDataService {
  // INJECTION-OF-HTTP-CLIENT
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

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }

  // ----  USER  ----  ----  ----  ----  ----

  // CREATE-USER  (USER-REGISTRATION)
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return (
      this.http
        .post(`${apiUrl}/users`, userDetails) // uses Angular's HttpClient for sending a POST-request to the API. The userDetails object is sent along with the request.
        // returns an Observable emitting the server response when the request is completed.
        .pipe(catchError(this.handleError))
    ); // The pipe operator is used to add additional processing steps. In this case, the catchError operator is used to catch possible errors.
  }

  // LOGIN-USER
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // EDIT-USER
  public editUser(userDetails: any): Observable<any> {
    return this.http
      .put(`${apiUrl}/users/${userDetails.Username}`, userDetails, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE-USER
  public deleteUser(userName: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}/users/${userName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ADD-FAVORITE-MOVIE
  public addFavoriteMovie(userName: string, moviesID: string): Observable<any> {
    return this.http
      .post(
        `${apiUrl}/users/${userName}/movies/${moviesID}`,
        {},
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE-FAVORITE-MOVIE
  public deleteFavoriteMovie(
    userName: string,
    moviesID: string
  ): Observable<any> {
    return this.http
      .delete(`${apiUrl}/users/${userName}/movies/${moviesID}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ----  MOVIES  ----  ----  ----  ----  ----

  // GET-ALL-MOVIES
  public getAllMovies(): Observable<any> {
    return this.http
      .get(`${apiUrl}/movies`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-SINGLE-MOVIE
  public getSingleMovie(title: string): Observable<any> {
    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-DIRECTOR
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}/movies/directors/${directorName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET-GENRE
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}/movies/genres/${genreName}`, {
        headers: this.getHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

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
