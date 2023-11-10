import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode(code: string): Observable<Country | null>{

    const url = `${this.apiUrl}/alpha/${code}`


    return this.http.get<Country[]>(url).pipe(
      map(countries => countries.length > 0 ? countries[0] : null ),
      catchError(error => of(null)))

  }

  searchCapital(term: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${term}`

    //retorna un observable de tipo Country
    return this.http.get<Country[]>(url).pipe(
      catchError(error => of([]))

    )

    //también se puede hacer de la siguiente manera:
    // return this.http.get<Country[]>(url).pipe(
    //   catchError(error => {
    //     console.log(error)
    //     return of([])
    //   })

    // )

  }

  searchCountry(term: string):Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`

    return this.http.get<Country[]>(url).pipe(
      catchError(error => of([]))
    )

  }

  searchRegion(term: string):Observable<Country[]> {

    const url = `${this.apiUrl}/region/${term}`

    return this.http.get<Country[]>(url).pipe(
      catchError(error => of([]))
    )

  }


}
