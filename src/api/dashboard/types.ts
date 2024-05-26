export interface ShiCiData {
  author: string;
  category: string;
  content: string;
  origin: string;
}

export interface WeatherData {
  result: {
    city: {
      Province: string;
      City: string;
    };
    condition: {
      day_weather: string;
      night_weather: string;
      day_wind_direction: string;
      day_wind_power: string;
      night_wind_direction: string;
      night_wind_power: string;
      max_degree: string;
      min_degree: string;
    };
  };
  message?: string;
  code: number;
}
