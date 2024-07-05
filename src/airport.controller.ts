import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Controller('airports')
export class AirportController {
  private airports: any[];
  private cities: any[];
  private countries: any[];

  constructor(private excelService: ExcelService) {
    this.loadData();
  }

  loadData() {
    const filePath = 'C:/Users/KANISH FATHIMA/Database.xlsx';
    this.airports = this.excelService.readExcel(filePath, 'airport');
    this.cities = this.excelService.readExcel(filePath, 'city');
    this.countries = this.excelService.readExcel(filePath, 'country');
  }

  @Get(':iata_code')
  getAirportByIataCode(@Param('iata_code') iataCode: string) {
    const airport = this.airports.find(a => a.iata_code === iataCode);
    if (!airport) {
      throw new NotFoundException(`Airport with IATA code ${iataCode} not found`);
    }

    const city = this.cities.find(c => c.id === airport.city_id);
    const country = this.countries.find(c => c.id === city?.country_id);

    return {
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: city ? {
            id: city.id,
            name: city.name,
            country_id: city.country_id,
            is_active: city.is_active,
            lat: city.lat,
            long: city.long
          } : null,
          country: country ? {
            id: country.id,
            name: country.name,
            country_code_two: country.country_code_two,
            country_code_three: country.country_code_three,
            mobile_code: country.mobile_code,
            continent_id: country.continent_id
          } : null
        }
      }
    };
  }
}