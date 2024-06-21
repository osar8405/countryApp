import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiURL: string = 'https://restcountries.com/v3.1';
    public cahceStore: CacheStore = {
        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
    }

    constructor(private http: HttpClient) {
        this.loadFromLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('casheStore', JSON.stringify(this.cahceStore));
    }

    private loadFromLocalStorage() {
        if (!localStorage.getItem('casheStore')) return;
        this.cahceStore = JSON.parse(localStorage.getItem('casheStore')!);
    }

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
        return this.getCountryRequest(url)
            .pipe(
                tap(countries => this.cahceStore.byCapital = { term, countries }),
                tap(() => this.saveToLocalStorage())
            );
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiURL}/name/${term}`;
        return this.getCountryRequest(url)
            .pipe(
                tap(countries => this.cahceStore.byCountries = { term, countries }),
                tap(() => this.saveToLocalStorage())
            );
    }

    searchRegion(region: Region): Observable<Country[]> {
        const url = `${this.apiURL}/region/${region}`;
        return this.getCountryRequest(url)
            .pipe(
                tap(countries => this.cahceStore.byRegion = { region, countries }),
                tap(() => this.saveToLocalStorage())
            );
    }
}