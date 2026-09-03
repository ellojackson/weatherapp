// UI indikator loading — ditampilkan saat request cuaca sedang berjalan.
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
      <span className="block h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
      <p>Memuat data cuaca...</p>
    </div>
  )
}
