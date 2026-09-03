// Controlled input component — mengirim keyword pencarian ke Parent (App.jsx) via callback `onQueryChange`.
export default function SearchBar({ value, onQueryChange, loading }) {
  return (
    <div className="mx-auto mb-10 max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Ketik nama kota, misal: Jakarta, Bandung, Tokyo..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-base shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        />
        {loading && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <span className="block h-5 w-5 animate-spin rounded-full border-2 border-sky-300 border-t-sky-600" />
          </div>
        )}
      </div>
    </div>
  )
}
