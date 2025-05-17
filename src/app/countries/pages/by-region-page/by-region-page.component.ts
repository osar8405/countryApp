import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/coutries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cahceStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cahceStore.byRegion.region;
  }
  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.countriesService.searchRegion(region)
    .subscribe(countries => {
      this.countries = countries;
    })
  }
}
