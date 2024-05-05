import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiURL: string = 'https://restcountries.com/v3.1';
    public cahceStore: CacheStore = {
        byCapital: {term: '', countries: []},
        byCountries: {term: '', countries: []},
        byRegion: {region: '', countries: []},
    }

    constructor(private http: HttpClient) { }

    private getCountryRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([])),
                delay(2000)
            );
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {
        const url = `${this.apiURL}/alpha/${code}`;
        return this.http.get<Country[]>(url)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
            )
    }

    searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiURL}/capital/${term}`;
        return this.getCountryRequest(url);
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiURL}/name/${term}`;
        return this.getCountryRequest(url);
    }

    searchRegion(term: string): Observable<Country[]> {
        const url = `${this.apiURL}/region/${term}`;
        return this.getCountryRequest(url);
    }
}