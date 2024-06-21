import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/coutries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string ='';

  constructor(private countriesService: CountriesService) {

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cahceStore.byCapital.countries;
    this.initialValue = this.countriesService.cahceStore.byCapital.term;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    })
  }
}
