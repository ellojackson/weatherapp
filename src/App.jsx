import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorAlert from './components/ErrorAlert'
import WeatherCard from './components/WeatherCard'
import EmptyState from './components/EmptyState'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const DEBOUNCE_DELAY = 500

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debounced
}

export default function App() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const debouncedQuery = useDebouncedValue(query.trim(), DEBOUNCE_DELAY)

  // useEffect reaktif terhadap search: fetch ulang setiap kali debouncedQuery berubah.
  useEffect(() => {
    if (!debouncedQuery) {
      setData(null)
      setError(null)
      setLoading(false)
      return
    }

    const controller = new AbortController()

    async function fetchWeather() {
      setLoading(true)
      setError(null)

      try {
        const geoParams = new URLSearchParams({
          name: debouncedQuery,
          count: '5',
          language: 'id',
          format: 'json',
        })
        const geoResponse = await fetch(`${GEOCODING_URL}?${geoParams}`, {
          signal: controller.signal,
        })

        if (!geoResponse.ok) {
          throw new Error(`Gagal menghubungi layanan pencarian kota (status ${geoResponse.status})`)
        }

        const geoJson = await geoResponse.json()
        const locations = geoJson?.results ?? []

        if (locations.length === 0) {
          throw new Error(`Kota "${debouncedQuery}" tidak ditemukan. Coba nama lain.`)
        }

        const weatherResults = await Promise.all(
          locations.map(async (location) => {
            const forecastParams = new URLSearchParams({
              latitude: String(location.latitude),
              longitude: String(location.longitude),
              current:
                'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
              timezone: 'auto',
            })
            const weatherResponse = await fetch(`${FORECAST_URL}?${forecastParams}`, {
              signal: controller.signal,
            })

            if (!weatherResponse.ok) {
              throw new Error(`Gagal mengambil data cuaca untuk ${location.name}`)
            }

            const weatherJson = await weatherResponse.json()
            return { location, weather: weatherJson?.current }
          }),
        )

        setData(weatherResults)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Terjadi kesalahan jaringan. Silakan coba lagi.')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    // Cleanup: batalkan request lama saat query berubah lagi atau komponen unmount.
    return () => controller.abort()
  }, [debouncedQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            🌦️ Weather Explorer
          </h1>
          <p className="mt-2 text-slate-500">
            Cari kota untuk melihat kondisi cuaca terkini (Open-Meteo API)
          </p>
        </header>

        <SearchBar value={query} onQueryChange={setQuery} loading={loading} />

        <main>
          {loading && <LoadingSpinner />}

          {!loading && error && <ErrorAlert message={error} />}

          {!loading && !error && data && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data?.map((item) => (
                <WeatherCard
                  key={`${item.location?.id ?? item.location?.name}-${item.location?.latitude}`}
                  item={item}
                />
              ))}
            </div>
          )}

          {!loading && !error && !data && <EmptyState />}
        </main>
      </div>
    </div>
  )
}
