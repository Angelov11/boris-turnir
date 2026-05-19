import { useMemo, useState } from "react";
import {
  Trophy,
  CalendarDays,
  Phone,
  Users,
  Medal,
  Clock,
  MapPin,
  Swords,
  ListChecks,
  Network,
} from "lucide-react";

const seniorTeams = [
  "Екипа 1",
  "Екипа 2",
  "Екипа 3",
  "Екипа 4",
  "Екипа 5",
  "Екипа 6",
  "Екипа 7",
  "Екипа 8",
];

const juniorTeams = [
  "Јуниори 2011/2012 - Екипа 1",
  "Јуниори 2013/2014 - Екипа 1",
  "Јуниори 2016 - Екипа 1",
  "Јуниори 2017 - Екипа 1",
];

const matches = [
  {
    id: 1,
    category: "Сениори",
    round: "Четвртфинале",
    teamA: "Екипа 1",
    teamB: "Екипа 2",
    date: "27.06.2026",
    time: "20:00",
    scoreA: null,
    scoreB: null,
  },
  {
    id: 2,
    category: "Сениори",
    round: "Четвртфинале",
    teamA: "Екипа 3",
    teamB: "Екипа 4",
    date: "27.06.2026",
    time: "21:00",
    scoreA: null,
    scoreB: null,
  },
  {
    id: 3,
    category: "Сениори",
    round: "Четвртфинале",
    teamA: "Екипа 5",
    teamB: "Екипа 6",
    date: "28.06.2026",
    time: "20:00",
    scoreA: null,
    scoreB: null,
  },
  {
    id: 4,
    category: "Сениори",
    round: "Четвртфинале",
    teamA: "Екипа 7",
    teamB: "Екипа 8",
    date: "28.06.2026",
    time: "21:00",
    scoreA: null,
    scoreB: null,
  },
  {
    id: 5,
    category: "Сениори",
    round: "Полуфинале",
    teamA: "Победник Меч 1",
    teamB: "Победник Меч 2",
    date: "По извлекување",
    time: "—",
    scoreA: null,
    scoreB: null,
  },
  {
    id: 6,
    category: "Сениори",
    round: "Полуфинале",
    teamA: "Победник Меч 3",
    teamB: "Победник Меч 4",
    date: "По извлекување",
    time: "—",
    scoreA: null,
    scoreB: null,
  },
  {
    id: 7,
    category: "Сениори",
    round: "Финале",
    teamA: "Победник Полуфинале 1",
    teamB: "Победник Полуфинале 2",
    date: "По извлекување",
    time: "—",
    scoreA: null,
    scoreB: null,
  },
];

const bracketRounds = [
  {
    title: "Четвртфинале",
    games: [
      ["Екипа 1", "Екипа 2"],
      ["Екипа 3", "Екипа 4"],
      ["Екипа 5", "Екипа 6"],
      ["Екипа 7", "Екипа 8"],
    ],
  },
  {
    title: "Полуфинале",
    games: [
      ["Победник Меч 1", "Победник Меч 2"],
      ["Победник Меч 3", "Победник Меч 4"],
    ],
  },
  {
    title: "Финале",
    games: [["Победник Полуфинале 1", "Победник Полуфинале 2"]],
  },
];

export default function TournamentPage() {
  const [activeTab, setActiveTab] = useState("home");

  const seniorPrizes = [
    { place: "Прво место", amount: "110.000 денари" },
    { place: "Второ место", amount: "60.000 денари" },
    { place: "Трето место", amount: "30.000 денари" },
  ];

  const juniorGenerations = ["2011/2012", "2013/2014", "2016", "2017"];

  const tabs = useMemo(
    () => [
      { id: "home", label: "Инфо", icon: Trophy },
      { id: "teams", label: "Екипи", icon: Users },
      { id: "schedule", label: "Распоред", icon: ListChecks },
      { id: "bracket", label: "Турнирско дрво", icon: Network },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-950 via-green-800 to-lime-500 text-white">
      <nav className="sticky top-0 z-20 border-b border-white/10 bg-green-950/80 px-4 py-3 backdrop-blur md:px-12">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-yellow-300 text-green-950"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {activeTab === "home" && (
        <>
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
                    Јави се за пријава
                  </a>
                  <button
                    onClick={() => setActiveTab("schedule")}
                    className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 font-bold backdrop-blur transition hover:bg-white/20"
                  >
                    Распоред на натпревари
                  </button>
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

          <section className="px-6 pb-14 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
              <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur md:col-span-2">
                <div className="mb-5 flex items-center gap-3">
                  <Medal className="text-yellow-300" />
                  <h2 className="text-2xl font-black">Парични награди — сениори</h2>
                </div>

                <div className="grid gap-4">
                  {seniorPrizes.map((prize, index) => (
                    <div key={prize.place} className="flex items-center justify-between rounded-2xl bg-white/10 p-5">
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

          <ContactAndLocation />
        </>
      )}

      {activeTab === "teams" && <TeamsSection />}
      {activeTab === "schedule" && <ScheduleSection />}
      {activeTab === "bracket" && <BracketSection />}
    </main>
  );
}

function TeamsSection() {
  return (
    <PageSection title="Екипи" subtitle="Листата може лесно да се менува директно во arrays во кодот.">
      <div className="grid gap-6 md:grid-cols-2">
        <TeamList title="Сениорски екипи" teams={seniorTeams} />
        <TeamList title="Јуниорски екипи" teams={juniorTeams} />
      </div>
    </PageSection>
  );
}

function ScheduleSection() {
  return (
    <PageSection title="Распоред на натпревари" subtitle="Датуми, саати и резултати можат да се пополнуваат подоцна.">
      <div className="grid gap-4">
        {matches.map(match => (
          <div key={match.id} className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 shadow-lg backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-3 py-1 text-sm font-black text-green-950">
                <Swords size={16} /> Меч {match.id}
              </div>
              <p className="text-sm font-bold text-yellow-200">{match.round} • {match.category}</p>
            </div>

            <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
              <MatchTeam name={match.teamA} score={match.scoreA} />
              <div className="text-center text-xl font-black text-yellow-300">VS</div>
              <MatchTeam name={match.teamB} score={match.scoreB} alignRight />
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-green-50">
              <span className="rounded-full bg-white/10 px-3 py-1">{match.date}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{match.time}</span>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function BracketSection() {
  return (
    <PageSection title="Турнирско дрво" subtitle="Статичко турнирско дрво за 8 екипи. По извлекувањето само ги менуваме имињата.">
      <div className="overflow-x-auto pb-4">
        <div className="grid min-w-[900px] grid-cols-3 gap-6">
          {bracketRounds.map(round => (
            <div key={round.title} className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur">
              <h2 className="mb-5 text-xl font-black text-yellow-300">{round.title}</h2>
              <div className="grid gap-6">
                {round.games.map((game, index) => (
                  <div key={`${round.title}-${index}`} className="rounded-2xl bg-white/10 p-4">
                    <p className="mb-3 text-xs font-bold uppercase text-green-100">Натпревар {index + 1}</p>
                    <div className="space-y-2">
                      <div className="rounded-xl bg-white/10 px-4 py-3 font-bold">{game[0]}</div>
                      <div className="text-center text-sm font-black text-yellow-300">против</div>
                      <div className="rounded-xl bg-white/10 px-4 py-3 font-bold">{game[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

function TeamList({ title, teams }) {
  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <Users className="text-yellow-300" />
        <h2 className="text-2xl font-black">{title}</h2>
      </div>
      <div className="grid gap-3">
        {teams.map((team, index) => (
          <div key={team} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300 text-green-950">
              {index + 1}
            </span>
            {team}
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchTeam({ name, score, alignRight }) {
  return (
    <div className={`rounded-2xl bg-white/10 p-5 ${alignRight ? "text-right" : ""}`}>
      <p className="text-lg font-black">{name}</p>
      <p className="mt-2 text-sm font-bold text-green-100">Резултат: {score === null ? "—" : score}</p>
    </div>
  );
}

function ContactAndLocation() {
  return (
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
  );
}

function PageSection({ title, subtitle, children }) {
  return (
    <section className="px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-black md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-green-50">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
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
