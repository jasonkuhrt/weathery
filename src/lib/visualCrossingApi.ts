import got, { Got } from 'got'

export class VisualCrossingApiClient {
  private got: Got
  private config: {
    apiKey: string
  }

  constructor(params: { apiKey: string }) {
    this.got = got.extend({
      prefixUrl: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/`,
    })
    this.config = {
      apiKey: params.apiKey,
    }
  }

  async forecast(): Promise<Forecast> {
    const res = await this.got.get<Forecast>('forecast', {
      searchParams: {
        locationMode: 'single',
        locations: 'montreal',
        key: this.config.apiKey,
        unitGroup: 'metric',
        aggregateHours: 24,
        combinationMethod: 'aggregate',
        contentType: 'json',
      },
    })
    return res.body
  }
}

type Column<ID, Unit = null> = {
  id: ID
  name: string
  type: number
  unit: Unit
}

// eslint-disable-next-line
namespace Units {
  export type DegC = 'degc'
  export type KM = 'km'
  export type KPH = 'kph'
}

type TimeZone = 'America/Toronto'

type TimeStamp = string

type Condition = 'Clear'

type Forecast = {
  remainingCost: number
  queryCost: number
  messages: null
  location: {
    stationContributions: null
    values: {
      wdir: number
      uvindex: number
      datetimeStr: string
      preciptype: string
      cin: number
      cloudcover: number
      pop: number
      mint: number
      datetime: number
      precip: number
      solarradiation: number
      dew: number
      humidity: number
      temp: number
      maxt: number
      visibility: number
      wspd: number
      severerisk: number
      solarenergy: number
      heatindex: null
      snowdepth: number
      sealevelpressure: number
      snow: number
      wgust: number
      conditions: Condition
      windchill: null
      cape: number
    }[]
    id: string
    address: string
    name: string
    index: number
    latitude: number
    longitude: number
    distance: number
    time: number
    tz: TimeZone
    currentConditions: {
      wdir: number
      temp: number
      sunrise: TimeStamp // '2021-08-26T06:08:33-04:00'
      visibility: number
      wspd: number
      icon: 'clear-night'
      stations: ''
      heatindex: null
      cloudcover: number
      datetime: TimeStamp // '2021-08-26T21:00:00-04:00'
      precip: number
      moonphase: number
      snowdepth: null
      sealevelpressure: number
      dew: number
      sunset: TimeStamp // '2021-08-26T19:42:29-04:00'
      humidity: number
      wgust: null
      windchill: null
    }
    alerts: null
  }
  columns: {
    wdir: Column<'wdir'>
    uvindex: Column<'uvindex'>
    latitude: Column<'latitude'>
    preciptype: Column<'preciptype'>
    cin: Column<'cin'>
    cloudcover: Column<'cloudcover'>
    pop: Column<'pop'>
    mint: Column<'mint'>
    datetime: Column<'datetime'>
    precip: Column<'precip'>
    solarradiation: Column<'solarradiation'>
    dew: Column<'dew', Units.DegC>
    humidity: Column<'humidity'>
    longitude: Column<'longitude'>
    temp: Column<'temp', Units.DegC>
    address: Column<'address'>
    maxt: Column<'maxt', Units.DegC>
    visibility: Column<'visibility', Units.KM>
    wspd: Column<'wspd', Units.KPH>
    severerisk: Column<'severerisk'>
    solarenergy: Column<'solarenergy'>
    heatindex: Column<'heatindex', Units.DegC>
    snowdepth: Column<'snowdepth'>
    sealevelpressure: Column<'sealevelpressure'>
    snow: Column<'snow'>
    name: Column<'name'>
    wgust: Column<'wgust', Units.KPH>
    conditions: Column<'conditions'>
    windchill: Column<'windchill', Units.DegC>
    cape: Column<'cape'>
  }
}
