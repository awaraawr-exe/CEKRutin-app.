import React, {useState} from 'react';
import {
  CalendarClock,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react';
import {FAMILY_WELLNESS_BANNER} from '../data/educationData';
import {usePWAInstall} from '../hooks/usePWAInstall';

interface GoogleLoginSplashProps {
  onGoogleLogin: () => Promise<void>;
  onOpenPwaGuide: () => void;
}

export const GoogleLoginSplash: React.FC<GoogleLoginSplashProps> = ({
  onGoogleLogin,
  onOpenPwaGuide,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const {isInstalled} = usePWAInstall();

  const handleLoginClick = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await onGoogleLogin();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('popup-closed-by-user')) {
        setErrorMsg('Jendela masuk Google ditutup sebelum selesai. Silakan coba lagi.');
      } else if (msg.includes('popup-blocked')) {
        setErrorMsg(
          'Browser memblokir jendela pop-up Google. Izinkan pop-up untuk situs ini lalu coba kembali.',
        );
      } else {
        setErrorMsg('Gagal masuk dengan akun Google. Periksa koneksi internet Anda lalu coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Minimal Top Bar */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <img src="/icon.svg" alt="Logo CEKRutin" className="w-7 h-7 rounded-lg" />
          <span className="text-lg font-extrabold tracking-tight text-slate-900">CEKRutin</span>
        </div>

        <span className="hidden sm:inline text-xs font-medium text-teal-700">
          Ingat, Periksa, Jaga Sehat
        </span>

        {!isInstalled ? (
          <button
            type="button"
            onClick={onOpenPwaGuide}
            className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-teal-700" />
            <span>Instal di HP</span>
          </button>
        ) : (
          <span className="text-xs font-semibold text-teal-700 whitespace-nowrap">
            Mode Aplikasi HP
          </span>
        )}
      </header>

      {/* Main Split Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Brand Value & Google Sign-In Card */}
          <section className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
                <span>Sistem Kendali Rutinitas Sehat Keluarga</span>
                <span aria-hidden="true">·</span>
                <span>Berbasis Keluarga & Puskesmas</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Ingat, Periksa, Jaga Sehat Bersama Keluarga
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Masuk menggunakan akun Google Anda sebagai <strong>Family Health Manager</strong>{' '}
                untuk mengelola rutinitas minum air, makan buah-sayur, aktivitas mikro, cek tekanan
                darah & gula darah seluruh anggota keluarga dalam satu dasbor terpadu.
              </p>

              {/* Google Sign-In Action */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={handleLoginClick}
                  disabled={loading}
                  className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-3 shadow-xs transition-colors cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
                      />
                    </svg>
                  </span>
                  <span>{loading ? 'Menghubungkan Akun Google...' : 'Masuk dengan Google'}</span>
                </button>

                {errorMsg && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-medium text-red-900"
                  >
                    {errorMsg}
                  </p>
                )}

                <div className="flex items-start gap-2 text-xs text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>
                    Nama dan email Google Anda otomatis terdaftar sebagai pengelola utama. Sesi
                    tetap tersimpan saat aplikasi PWA dibuka kembali di HP.
                  </span>
                </div>
              </div>
            </div>

            {/* Key Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Users className="w-4 h-4 text-teal-600" />
                  <span>Multi-Profil</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Pantau Ayah, Ibu, Anak & Lansia dalam satu akun pengelola.
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <HeartPulse className="w-4 h-4 text-sky-600" />
                  <span>Evaluasi HBM</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Deteksi dini warna Hijau, Kuning, dan rujukan Puskesmas.
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <CalendarClock className="w-4 h-4 text-emerald-600" />
                  <span>Agenda & Kuis</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Pengingat Faskes dan E-Sertifikat edukasi PTM keluarga.
                </p>
              </div>
            </div>
          </section>

          {/* Right Column: Editorial Visual & Family Preview */}
          <section className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col">
            <div className="relative flex-1 min-h-[260px] bg-teal-50">
              <img
                src={FAMILY_WELLNESS_BANNER}
                alt="Keluarga Indonesia menerapkan kebiasaan sehat bersama di rumah"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover lg:absolute lg:inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                <p className="text-xs font-semibold text-teal-200">
                  Gerakan Keluarga Sadar Sehat · Promotif & Preventif
                </p>
                <p className="text-lg font-bold leading-snug">
                  Kendalikan faktor risiko hipertensi, diabetes, dan kolesterol mulai dari rumah.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white border-t border-slate-100 space-y-2.5">
              <p className="text-xs font-bold text-slate-800">
                Setelah masuk dengan Google, Anda langsung terhubung ke:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Sub-profil Ayah, Ibu, Anak, Lansia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Sinkronisasi awan & akses offline</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
