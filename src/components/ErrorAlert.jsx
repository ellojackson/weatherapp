// Alert error — menampilkan pesan ramah saat pencarian tidak ditemukan atau jaringan bermasalah.
export default function ErrorAlert({ message }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-rose-50 px-6 py-5 text-center text-rose-600 shadow-sm">
      <p className="text-2xl">⚠️</p>
      <p className="mt-2 font-medium">{message}</p>
    </div>
  )
}
