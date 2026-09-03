import { describeWeatherCode } from '../utils/weatherCodes'

// UI card item — menerima 1 hasil { location, weather } dari Parent (App.jsx) via props.
export default function WeatherCard({ item }) {
  const info = describeWeatherCode(item.weather?.weather_code)

  return (
    <article className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{item.location?.name}</h2>
          <p className="text-sm text-slate-500">
            {[item.location?.admin1, item.location?.country].filter(Boolean).join(', ')}
          </p>
        </div>
        <span className="text-4xl" title={info.label}>
          {info.icon}
        </span>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-4xl font-bold text-slate-800">
          {item.weather?.temperature_2m?.toFixed?.(1) ?? '--'}
        </span>
        <span className="mb-1 text-slate-500">°C</span>
      </div>
      <p className="text-sm text-slate-500">{info.label}</p>

      <dl className="mt-4 grid grid-cols-2 gap-y-2 border-t border-slate-100 pt-3 text-sm">
        <dt className="text-slate-400">Terasa seperti</dt>
        <dd className="text-right text-slate-700">
          {item.weather?.apparent_temperature?.toFixed?.(1) ?? '--'}°C
        </dd>
        <dt className="text-slate-400">Kelembapan</dt>
        <dd className="text-right text-slate-700">{item.weather?.relative_humidity_2m ?? '--'}%</dd>
        <dt className="text-slate-400">Angin</dt>
        <dd className="text-right text-slate-700">{item.weather?.wind_speed_10m ?? '--'} km/j</dd>
        <dt className="text-slate-400">Curah hujan</dt>
        <dd className="text-right text-slate-700">{item.weather?.precipitation ?? '--'} mm</dd>
      </dl>
    </article>
  )
}
