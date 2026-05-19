import { Trophy, CalendarDays, Phone, Users, Medal, Clock, MapPin } from "lucide-react";

export default function TournamentPage() {
  const seniorPrizes = [
    { place: "Прво место", amount: "110.000 денари" },
    { place: "Второ место", amount: "60.000 денари" },
    { place: "Трето место", amount: "30.000 денари" },
  ];

  const juniorGenerations = ["2011/2012", "2013/2014", "2016", "2017"];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-950 via-green-800 to-lime-500 text-white">
      <section className="relative overflow-hidden px-6 py-10 md:px-12 md:py-16">
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-300/50 bg-white/10 px-4 py-2 text-sm font-semibold text-yellow-200 backdrop-blur">
              <Trophy size={18} /> Меморијален турнир 2026
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Меморијален турнир во мал фудбал
              <span className="mt-2 block text-yellow-300">„Борис Трајковски“</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-green-50 md:text-xl">
              Струмица 2026 — спорт, дружба и натпреварувачки дух во чест на меморијалниот турнир.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+38972545226"
                className="rounded-2xl bg-yellow-300 px-6 py-3 font-bold text-green-950 shadow-lg transition hover:scale-105"
              >
                Пријави екипа
              </a>
              <a
                href="#info"
                className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 font-bold backdrop-blur transition hover:bg-white/20"
              >
                Види информации
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-yellow-300 to-lime-300 p-6 text-green-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide">Вкупен награден фонд</p>
                  <p className="mt-2 text-5xl font-black">235.000</p>
                  <p className="font-bold">денари</p>
                </div>
                <Trophy size={72} className="opacity-80" />
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<CalendarDays />} title="Почеток" text="27.06.2026" />
              <InfoCard icon={<Clock />} title="Пријавување" text="до 18 јуни" />
              <InfoCard icon={<Users />} title="Сениори" text="6.000 денари" />
              <InfoCard icon={<Users />} title="Јуниори" text="3.000 денари" />
            </div>
          </div>
        </div>
      </section>

      <section id="info" className="px-6 pb-14 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur md:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <Medal className="text-yellow-300" />
              <h2 className="text-2xl font-black">Парични награди — сениори</h2>
            </div>

            <div className="grid gap-4">
              {seniorPrizes.map((prize, index) => (
                <div
                  key={prize.place}
                  className="flex items-center justify-between rounded-2xl bg-white/10 p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300 text-xl font-black text-green-950">
                      {index + 1}
                    </div>
                    <p className="font-bold">{prize.place}</p>
                  </div>
                  <p className="text-xl font-black text-yellow-300">{prize.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <Trophy className="text-yellow-300" />
              <h2 className="text-2xl font-black">Јуниори</h2>
            </div>

            <div className="rounded-2xl bg-yellow-300 p-5 text-green-950">
              <p className="text-sm font-bold uppercase">Прво место</p>
              <p className="mt-1 text-3xl font-black">35.000 денари</p>
            </div>

            <p className="mt-5 font-bold">Генерации:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {juniorGenerations.map(generation => (
                <span key={generation} className="rounded-full bg-white/15 px-4 py-2 font-bold">
                  {generation}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <Phone className="text-yellow-300" />
              <h2 className="text-2xl font-black">Контакт за пријавување</h2>
            </div>

            <div className="space-y-3">
              <a href="tel:+38972545226" className="block rounded-2xl bg-white/10 p-4 font-bold hover:bg-white/20">
                Костадин — 072 545 226
              </a>
              <a href="tel:+38974604023" className="block rounded-2xl bg-white/10 p-4 font-bold hover:bg-white/20">
                Никола — 074 604 023
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="text-yellow-300" />
              <h2 className="text-2xl font-black">Локација</h2>
            </div>
            <p className="text-green-50">Струмица</p>
            <p className="mt-4 text-sm text-green-100">
              По завршување на пријавувањето ќе се изврши извлекување на екипите.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 text-white">
      <div className="mb-2 text-yellow-300">{icon}</div>
      <p className="text-sm font-semibold text-green-100">{title}</p>
      <p className="text-lg font-black">{text}</p>
    </div>
  );
}
