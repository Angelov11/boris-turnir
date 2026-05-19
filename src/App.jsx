import { useEffect, useMemo, useState } from "react";
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
  RefreshCcw,
} from "lucide-react";

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const SHEET_API_BASE = SHEET_ID ? `https://opensheet.elk.sh/${SHEET_ID}` : null;

const emptyTeams = [];
const emptyMatches = [];
const emptyBracket = [];

async function fetchSheetTab(tabName) {
  if (!SHEET_API_BASE) return [];

const response = await fetch(`${SHEET_API_BASE}/${tabName}`, {
  cache: "no-store",
}); 


if (!response.ok) {
    throw new Error(`Cannot load ${tabName}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export default function TournamentPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [teams, setTeams] = useState(emptyTeams);
  const [matches, setMatches] = useState(emptyMatches);
  const [bracket, setBracket] = useState(emptyBracket);
  const [loading, setLoading] = useState(Boolean(SHEET_API_BASE));
  const [error, setError] = useState("");

  const loadSheetData = async () => {
    try {
      setLoading(true);
      setError("");

      const [teamsData, matchesData, bracketData] = await Promise.all([
        fetchSheetTab("Teams"),
        fetchSheetTab("Matches"),
        fetchSheetTab("Bracket"),
      ]);

      setTeams(teamsData);
      setMatches(matchesData);
      setBracket(bracketData);
    } catch (err) {
      console.log(err)
      setError("Не може да се вчитаат податоците од Google Sheets. Проверете дали Sheet-от е Public / Anyone with the link.");
      setTeams([]);
      setMatches([]);
      setBracket([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadSheetData();
    })();
  }, []);

  const seniorPrizes = [
    { place: "Прво место", amount: "110.000 денари" },
    { place: "Второ место", amount: "60.000 денари" },
    { place: "Трето место", amount: "30.000 денари" },
  ];

  const juniorGenerations = ["2011/2012", "2013/2014", "2016", "2017"];

  const seniorTeams = teams.filter(team => team.category?.toLowerCase() === "senior").map(team => team.name);
  const juniorTeams = teams.filter(team => team.category?.toLowerCase() === "junior").map(team => team.name);

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
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto">
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

          <button
            onClick={loadSheetData}
              disabled={loading}
            className="ml-auto flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            Освежи
          </button>
        </div>
      </nav>

      {(loading || error) && (
        <div className="px-6 pt-4 md:px-12">
          <div className={`mx-auto max-w-6xl rounded-2xl px-4 py-3 text-sm font-bold ${error ? "bg-red-500/20 text-red-100" : "bg-white/10 text-green-50"}`}>
            {loading ? "Се вчитуваат податоци..." : error}
          </div>
        </div>
      )}

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

      {activeTab === "teams" && <TeamsSection seniorTeams={seniorTeams} juniorTeams={juniorTeams} />}
      {activeTab === "schedule" && <ScheduleSection matches={matches} />}
      {activeTab === "bracket" && <BracketSection bracket={bracket} />}
    </main>
  );
}

function TeamsSection({ seniorTeams, juniorTeams }) {
  return (
    <PageSection title="Екипи" subtitle="Оваа листа се чита од Google Sheets.">
      <div className="grid gap-6 md:grid-cols-2">
        <TeamList title="Сениорски екипи" teams={seniorTeams} emptyText="Сè уште нема внесени сениорски екипи." />
        <TeamList title="Јуниорски екипи" teams={juniorTeams} emptyText="Сè уште нема внесени јуниорски екипи." />
      </div>
    </PageSection>
  );
}

function ScheduleSection({ matches }) {
  return (
    <PageSection title="Распоред на натпревари" subtitle="Датуми, саати и резултати се читаат од Google Sheets.">
      {!matches.length ? (
        <EmptyState text="Сè уште нема внесен распоред на натпревари." />
      ) : (
      <div className="grid gap-4">
        {matches.map((match, index) => (
          <div key={match.id || index} className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 shadow-lg backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-3 py-1 text-sm font-black text-green-950">
                <Swords size={16} /> Меч {match.id || index + 1}
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
      )}
    </PageSection>
  );
}

function BracketSection({ bracket }) {
  const groupedRounds = bracket.reduce((rounds, game) => {
    const roundName = game.round || "Рунда";
    const existingRound = rounds.find(round => round.title === roundName);

    if (existingRound) {
      existingRound.games.push(game);
    } else {
      rounds.push({ title: roundName, games: [game] });
    }

    return rounds;
  }, []);

  return (
    <PageSection title="Турнирско дрво" subtitle="Турнирското дрво се чита од Google Sheets. Може да внесеш колку сакаш рунди и натпревари.">
      {!bracket.length ? (
        <EmptyState text="Сè уште нема внесено турнирско дрво." />
      ) : (
        <div className="overflow-x-auto pb-4">
          <div
            className="grid gap-6"
            style={{
              minWidth: `${Math.max(groupedRounds.length, 1) * 300}px`,
              gridTemplateColumns: `repeat(${groupedRounds.length}, minmax(280px, 1fr))`,
            }}
          >
            {groupedRounds.map(round => (
              <div key={round.title} className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur">
                <h2 className="mb-5 text-xl font-black text-yellow-300">{round.title}</h2>
                <div className="grid gap-6">
                  {round.games.map((game, index) => (
                    <div key={`${round.title}-${game.game || index}`} className="rounded-2xl bg-white/10 p-4">
                      <p className="mb-3 text-xs font-bold uppercase text-green-100">Натпревар {game.game || index + 1}</p>
                      <div className="space-y-2">
                        <div className="rounded-xl bg-white/10 px-4 py-3 font-bold">{game.teamA}</div>
                        <div className="text-center text-sm font-black text-yellow-300">против</div>
                        <div className="rounded-xl bg-white/10 px-4 py-3 font-bold">{game.teamB}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageSection>
  );
}

function TeamList({ title, teams, emptyText }) {
  return (
    <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <Users className="text-yellow-300" />
        <h2 className="text-2xl font-black">{title}</h2>
      </div>

      {!teams.length ? (
        <EmptyState text={emptyText} />
      ) : (
        <div className="grid gap-3">
          {teams.map((team, index) => (
            <div key={`${team}-${index}`} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300 text-green-950">
                {index + 1}
              </span>
              {team}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/25 bg-white/5 p-6 text-center font-bold text-green-50">
      {text}
    </div>
  );
}

function MatchTeam({ name, score, alignRight }) {
  const hasScore = score !== undefined && score !== null && String(score).trim() !== "";

  return (
    <div className={`rounded-2xl bg-white/10 p-5 ${alignRight ? "text-right" : ""}`}>
      <p className="text-lg font-black">{name}</p>
      <p className="mt-2 text-sm font-bold text-green-100">Резултат: {hasScore ? score : "—"}</p>
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
