import type { Country } from './types'

const API_BASE_URL = 'https://restcountries.com/v3.1'

export class FlagAPI {
  private countries: Country[] = []

  async fetchAllCountries(): Promise<Country[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/all?fields=name,flags,cca2`)
      
      if (!response.ok) {
        throw new Error('Error al obtener las banderas')
      }
      
      this.countries = await response.json()
      return this.countries
    } catch (error) {
      console.error('Error al obtener los países:', error)
      throw error
    }
  }

  getRandomCountries(count: number): Country[] {
    const shuffled = [...this.countries].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  getRandomCountry(): Country {
    const randomIndex = Math.floor(Math.random() * this.countries.length)
    return this.countries[randomIndex]
  }

  get allCountries(): Country[] {
    return this.countries
  }
}
