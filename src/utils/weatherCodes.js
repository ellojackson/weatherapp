// WMO Weather interpretation codes -> { label, icon }
export const WEATHER_CODES = {
  0: { label: 'Cerah', icon: '☀️' },
  1: { label: 'Cerah Berawan Sebagian', icon: '🌤️' },
  2: { label: 'Berawan Sebagian', icon: '⛅' },
  3: { label: 'Berawan', icon: '☁️' },
  45: { label: 'Berkabut', icon: '🌫️' },
  48: { label: 'Kabut Beku', icon: '🌫️' },
  51: { label: 'Gerimis Ringan', icon: '🌦️' },
  53: { label: 'Gerimis Sedang', icon: '🌦️' },
  55: { label: 'Gerimis Lebat', icon: '🌧️' },
  61: { label: 'Hujan Ringan', icon: '🌧️' },
  63: { label: 'Hujan Sedang', icon: '🌧️' },
  65: { label: 'Hujan Lebat', icon: '🌧️' },
  71: { label: 'Salju Ringan', icon: '🌨️' },
  73: { label: 'Salju Sedang', icon: '🌨️' },
  75: { label: 'Salju Lebat', icon: '❄️' },
  80: { label: 'Hujan Lokal Ringan', icon: '🌦️' },
  81: { label: 'Hujan Lokal Sedang', icon: '🌧️' },
  82: { label: 'Hujan Lokal Lebat', icon: '⛈️' },
  95: { label: 'Badai Petir', icon: '⛈️' },
  96: { label: 'Badai Petir + Hujan Es', icon: '⛈️' },
  99: { label: 'Badai Petir Hebat', icon: '⛈️' },
}

export function describeWeatherCode(code) {
  return WEATHER_CODES[code] ?? { label: 'Tidak diketahui', icon: '❓' }
}
