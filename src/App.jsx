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
  Menu,
  X,
} from "lucide-react";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const emptyTeams = [];
const emptyMatches = [];
const emptyBracket = [];

async function fetchSheetTab(tabName) {
  if (!GOOGLE_SCRIPT_URL) return [];

  const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${tabName}&t=${Date.now()}`, {
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [teams, setTeams] = useState(emptyTeams);
  const [matches, setMatches] = useState(emptyMatches);
  const [bracket, setBracket] = useState(emptyBracket);
  const [loading, setLoading] = useState(Boolean(GOOGLE_SCRIPT_URL));
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
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
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
  
  useEffect(() => {
    (async () => {
        if (["teams", "schedule", "bracket"].includes(activeTab)) {
          loadSheetData();
        }  
    })();
  }, [activeTab]);  

  const seniorPrizes = [
    { place: "Прво место", amount: "110.000 денари" },
    { place: "Второ место", amount: "60.000 денари" },
    { place: "Трето место", amount: "30.000 денари" },
  ];

  const juniorGenerations = ["2011/2012", "2013/2014", "2016", "2017"];

  const approvedTeams = teams.filter(team => {
    const status = normalizeCell(team.status).toLowerCase();
    return status === "accepted" || status === "confirmed" || status === "approved";
  });

  const seniorTeams = approvedTeams.filter(team => team.category?.toLowerCase() === "senior");
  const juniorTeams = approvedTeams.filter(team => team.category?.toLowerCase() === "junior");

  const tabs = useMemo(
    () => [
      { id: "home", label: "Инфо", icon: Trophy },
      { id: "register", label: "Пријава", icon: Users },
      { id: "teams", label: "Екипи", icon: Users },
      { id: "schedule", label: "Распоред", icon: ListChecks },
      { id: "bracket", label: "Турнирско дрво", icon: Network },
    ],
    []
  );

  const selectTab = tabId => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-green-950 via-green-800 to-lime-500 text-white">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-green-950/90 px-3 py-3 backdrop-blur sm:px-4 lg:px-12">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="flex items-center gap-2 rounded-full bg-yellow-300 px-4 py-2 text-sm font-black text-green-950 shadow-lg md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            Мени
          </button>

          <div className="hidden items-center gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] md:flex">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
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

          <button
            onClick={loadSheetData}
            className="ml-auto flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20 sm:px-4 sm:text-sm"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            Освежи
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mx-auto mt-3 grid w-full max-w-6xl gap-2 rounded-[1.5rem] border border-white/10 bg-green-900/95 p-3 shadow-2xl md:hidden">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                    isActive
                      ? "bg-yellow-300 text-green-950"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {(loading || error) && (
        <div className="px-4 pt-4 sm:px-6 lg:px-12">
          <div className={`mx-auto max-w-6xl rounded-2xl px-4 py-3 text-sm font-bold ${error ? "bg-red-500/20 text-red-100" : "bg-white/10 text-green-50"}`}>
            {loading ? "Се вчитуваат податоци..." : error}
          </div>
        </div>
      )}

      {activeTab === "home" && (
        <>
          <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-12 lg:py-16">
            <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />
            <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />

            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="min-w-0">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-300/50 bg-white/10 px-4 py-2 text-sm font-semibold text-yellow-200 backdrop-blur">
                  <Trophy size={18} /> Меморијален турнир 2026
                </div>

                <h1 className="break-words text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Меморијален турнир во мал фудбал
                  <span className="mt-2 block text-yellow-300">„Борис Трајковски“</span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed text-green-50 sm:text-lg lg:text-xl">
                  Струмица 2026 — спорт, дружба и натпреварувачки дух во чест на меморијалниот турнир.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    onClick={() => setActiveTab("register")}
                    className="w-full rounded-2xl bg-yellow-300 px-6 py-3 text-center font-bold text-green-950 shadow-lg transition hover:scale-105 sm:w-auto"
                  >
                    Пријави екипа
                  </button>
                  <button
                    onClick={() => setActiveTab("schedule")}
                    className="w-full rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-center font-bold backdrop-blur transition hover:bg-white/20 sm:w-auto"
                  >
                    Распоред на натпревари
                  </button>
                </div>
              </div>

              <div className="w-full min-w-0 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur sm:p-6">
                <div className="w-full rounded-[1.5rem] bg-gradient-to-br from-yellow-300 to-lime-300 p-5 text-green-950 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide">Вкупен награден фонд</p>
                      <p className="mt-2 text-4xl font-black sm:text-5xl">235.000</p>
                      <p className="font-bold">денари</p>
                    </div>
                    <Trophy className="h-14 w-14 shrink-0 opacity-80 sm:h-[72px] sm:w-[72px]" />
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

          <section className="px-4 pb-14 sm:px-6 lg:px-12">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="min-w-0 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur sm:p-6 lg:col-span-2">
                <div className="mb-5 flex items-center gap-3">
                  <Medal className="text-yellow-300" />
                  <h2 className="text-2xl font-black">Парични награди — сениори</h2>
                </div>

                <div className="grid gap-4">
                  {seniorPrizes.map((prize, index) => (
                    <div key={prize.place} className="flex flex-col gap-3 rounded-2xl bg-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300 text-xl font-black text-green-950">
                          {index + 1}
                        </div>
                        <p className="font-bold">{prize.place}</p>
                      </div>
                      <p className="text-lg font-black text-yellow-300 sm:text-xl">{prize.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Trophy className="text-yellow-300" />
                  <h2 className="text-2xl font-black">Општински шампион</h2>
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

      {activeTab === "register" && <RegistrationSection onSubmitted={loadSheetData} />}
      {activeTab === "teams" && <TeamsSection seniorTeams={seniorTeams} juniorTeams={juniorTeams} />}
      {activeTab === "schedule" && <ScheduleSection matches={matches} />}
      {activeTab === "bracket" && <BracketSection bracket={bracket} />}
    </main>
  );
}

function RegistrationSection() {
  const [form, setForm] = useState({
    category: "senior",
    name: "",
    contactName: "",
    phone: "",
    logo: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

const submitTeam = async event => {
  event.preventDefault();

  if (!GOOGLE_SCRIPT_URL) {
    setMessage("Формата не е конфигурирана. Недостасува Google Script URL.");
    return;
  }

  if (!form.name.trim() || !form.contactName.trim() || !form.phone.trim()) {
    setMessage("Внесете име на екипа, контакт лице и телефон.");
    return;
  }

  try {
    setSubmitting(true);
    setMessage("");

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ action: "registerTeam", ...form }),
    });

    setForm({
      category: "senior",
      name: "",
      contactName: "",
      phone: "",
      logo: "",
    });

    setMessage("Пријавата е испратена. Екипата нема да се прикаже јавно додека не биде одобрена.");
  } catch (error) {
    console.log(error);
    setMessage("Не може да се испрати пријавата. Обидете се повторно.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <PageSection title="Пријава на екипа" subtitle="Испратените екипи прво одат на одобрување, па потоа се прикажуваат јавно.">
      <form onSubmit={submitTeam} className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="grid gap-2 font-bold">
            Категорија
            <select value={form.category} onChange={event => updateField("category", event.target.value)} className="w-full min-w-0 rounded-2xl bg-white/90 px-4 py-3 text-green-950 outline-none">
              <option value="senior">Сениори</option>
              <option value="junior">Јуниори</option>
            </select>
          </label>

          <label className="grid gap-2 font-bold">
            Име на екипа
            <input value={form.name} onChange={event => updateField("name", event.target.value)} className="w-full min-w-0 rounded-2xl bg-white/90 px-4 py-3 text-green-950 outline-none" placeholder="Пр. ФК Струмица" />
          </label>

          <label className="grid gap-2 font-bold">
            Контакт лице
            <input value={form.contactName} onChange={event => updateField("contactName", event.target.value)} className="w-full min-w-0 rounded-2xl bg-white/90 px-4 py-3 text-green-950 outline-none" placeholder="Име и презиме" />
          </label>

          <label className="grid gap-2 font-bold">
            Телефон
            <input value={form.phone} onChange={event => updateField("phone", event.target.value)} className="w-full min-w-0 rounded-2xl bg-white/90 px-4 py-3 text-green-950 outline-none" placeholder="07X XXX XXX" />
          </label>

          <label className="grid gap-2 font-bold sm:col-span-2">
            Лого URL — optional
            <input value={form.logo} onChange={event => updateField("logo", event.target.value)} className="w-full min-w-0 rounded-2xl bg-white/90 px-4 py-3 text-green-950 outline-none" placeholder="https://..." />
          </label>
        </div>

        <button disabled={submitting} className="mt-6 w-full rounded-2xl bg-yellow-300 px-6 py-3 font-black text-green-950 shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
          {submitting ? "Се испраќа..." : "Испрати пријава"}
        </button>

        {message && <p className="mt-4 rounded-2xl bg-white/10 p-4 font-bold text-green-50">{message}</p>}
      </form>
    </PageSection>
  );
}

function TeamsSection({ seniorTeams, juniorTeams }) {
  return (
    <PageSection title="Екипи" subtitle="">
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatsCard title="Сениорски екипи" value={seniorTeams.length} />
        <StatsCard title="Јуниорски екипи" value={juniorTeams.length} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TeamList title="Сениорски екипи" teams={seniorTeams} emptyText="Сè уште нема внесени сениорски екипи." />
        <TeamList title="Јуниорски екипи" teams={juniorTeams} emptyText="Сè уште нема внесени јуниорски екипи." />
      </div>
    </PageSection>
  );
}

function StatsCard({ title, value }) {
  return (
    <div className="min-w-0 rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur sm:p-6">
      <p className="text-sm font-black uppercase tracking-widest text-yellow-200">{title}</p>
      <p className="mt-2 text-5xl font-black text-white">{value}</p>
    </div>
  );
}

function ScheduleSection({ matches }) {
  return (
    <PageSection title="Распоред на натпревари" subtitle="">
      {!matches.length ? (
        <EmptyState text="Сè уште нема внесен распоред на натпревари." />
      ) : (
        <div className="grid gap-6">
          {matches.map((match, index) => {
            const scoreA = normalizeCell(match.scoreA);
            const scoreB = normalizeCell(match.scoreB);
            const hasResult = scoreA !== "" && scoreB !== "";

            return (
              <div key={match.id || index} className="min-w-0 rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur sm:p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-4 py-2 text-sm font-black text-green-950">
                    <Swords size={16} /> Меч {match.id || index + 1}
                  </div>
                  <p className="text-sm font-black text-yellow-200">
                    {normalizeCell(match.round) || "Рунда"} • {normalizeCell(match.category) || "Категорија"}
                  </p>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_260px_minmax(0,1fr)]">
                  <MatchTeam name={match.teamA} logo={match.logoA} />

                  <div className="rounded-[1.5rem] bg-green-950/60 p-4 text-center shadow-xl sm:p-6">
                    <p className="text-sm font-black uppercase tracking-widest text-green-100">Резултат</p>
                    <p className="mt-2 text-5xl font-black text-white sm:text-6xl lg:text-7xl">
                      {hasResult ? (
                        <>
                          {scoreA}<span className="px-3 text-yellow-300">:</span>{scoreB}
                        </>
                      ) : (
                        <span className="text-4xl text-yellow-300">VS</span>
                      )}
                    </p>
                  </div>

                  <MatchTeam name={match.teamB} logo={match.logoB} alignRight />
                </div>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <div className="flex flex-wrap justify-center gap-3 text-sm font-bold text-green-50 sm:text-base">
                    <span className="rounded-full bg-white/10 px-4 py-2">📅 {formatDateCell(match.date)}</span>
                    <span className="rounded-full bg-white/10 px-4 py-2">🕘 {formatTimeCell(match.time)}</span>
                    {normalizeCell(match.location) && (
                      <span className="rounded-full bg-white/10 px-4 py-2">📍 {match.location}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
    <PageSection title="Турнирско дрво" subtitle="">
      {!bracket.length ? (
        <EmptyState text="Сè уште нема внесено турнирско дрво." />
      ) : (
        <div className="w-full overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
          <div
            className="grid gap-6"
            style={{
              minWidth: `${Math.max(groupedRounds.length, 1) * 330}px`,
              gridTemplateColumns: `repeat(${groupedRounds.length}, minmax(310px, 1fr))`,
            }}
          >
            {groupedRounds.map((round, roundIndex) => (
              <div key={round.title} className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-black text-yellow-300 sm:text-xl">{round.title}</h2>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-green-50">
                    {round.games.length} натпревари
                  </span>
                </div>

                <div className="grid gap-5">
                  {round.games.map((game, index) => {
                    const scoreA = normalizeCell(game.scoreA);
                    const scoreB = normalizeCell(game.scoreB);
                    const hasResult = scoreA !== "" && scoreB !== "";

                    return (
                      <div key={`${round.title}-${game.game || index}`} className="relative rounded-[1.5rem] border border-white/10 bg-green-950/35 p-4 shadow-lg">
                        {roundIndex < groupedRounds.length - 1 && (
                          <div className="absolute -right-6 top-1/2 hidden h-px w-6 bg-yellow-300/50 md:block" />
                        )}

                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-green-950">
                            Меч {game.game || index + 1}
                          </span>
                          {hasResult && (
                            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-black text-yellow-300">
                              {scoreA} : {scoreB}
                            </span>
                          )}
                        </div>

                        <BracketTeam name={game.teamA} logo={game.logoA} score={scoreA} />
                        <div className="my-2 text-center text-xs font-black uppercase tracking-widest text-yellow-300">против</div>
                        <BracketTeam name={game.teamB} logo={game.logoB} score={scoreB} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageSection>
  );
}

function BracketTeam({ name, logo, score }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-white/10 p-3">
      <div className="flex items-center gap-3">
        <TeamLogo logo={normalizeCell(logo)} name={normalizeCell(name) || "Екипа"} small />
        <p className="font-black">{normalizeCell(name) || "Екипа"}</p>
      </div>
      {score !== "" && <p className="text-lg font-black text-yellow-300 sm:text-xl">{score}</p>}
    </div>
  );
}

function TeamList({ title, teams, emptyText }) {
  return (
    <div className="min-w-0 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <Users className="text-yellow-300" />
        <h2 className="text-2xl font-black">{title}</h2>
      </div>

      {!teams.length ? (
        <EmptyState text={emptyText} />
      ) : (
        <div className="grid gap-4">
          {teams.map((team, index) => {
            const teamName = normalizeCell(team.name) || "Екипа";
            return (
              <div key={`${teamName}-${index}`} className="group flex min-w-0 flex-col gap-4 rounded-[1.5rem] bg-white/10 p-4 shadow-lg transition hover:bg-white/15 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <TeamLogo logo={normalizeCell(team.logo)} name={teamName} small />
                  <div>
                    <p className="break-words text-lg font-black">{teamName}</p>
                    <p className="text-sm font-bold text-green-100">#{index + 1}</p>
                  </div>
                </div>
                <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-green-950">
                  {normalizeCell(team.category) === "senior" ? "Сениори" : "Јуниори"}
                </span>
              </div>
            );
          })}
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

function MatchTeam({ name, logo, alignRight }) {
  const cleanName = normalizeCell(name) || "Екипа";
  const cleanLogo = normalizeCell(logo);

  return (
    <div className={"flex min-w-0 flex-col items-center gap-4 rounded-[1.5rem] bg-white/10 p-4 text-center sm:flex-row sm:gap-5 sm:p-5 " + (alignRight ? "sm:justify-end sm:text-right" : "")}>
      {!alignRight && <TeamLogo logo={cleanLogo} name={cleanName} />}
      <p className="break-words text-2xl font-black sm:text-3xl">{cleanName}</p>
      {alignRight && <TeamLogo logo={cleanLogo} name={cleanName} />}
    </div>
  );
}

function TeamLogo({ logo, name, small = false }) {
  const sizeClass = small ? "h-12 w-12 text-xl" : "h-16 w-16 text-2xl sm:h-20 sm:w-20 sm:text-3xl lg:h-24 lg:w-24";
  if (!logo) {
    return (
      <div className={"flex shrink-0 items-center justify-center rounded-2xl bg-yellow-300 font-black text-green-950 " + sizeClass}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={name + " logo"}
      className={"shrink-0 rounded-2xl bg-white/90 object-contain p-2 " + sizeClass}
      onError={event => {
        event.currentTarget.style.display = "none";
      }}
    />
  );
}

function normalizeCell(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function formatDateCell(value) {
  const cleanValue = normalizeCell(value);
  if (!cleanValue) return "Датум не е внесен";

  if (cleanValue.includes("T")) {
    const date = new Date(cleanValue);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("mk-MK", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Europe/Skopje",
      }).format(date);
    }
  }

  return cleanValue;
}

function formatTimeCell(value) {
  const cleanValue = normalizeCell(value);
  if (!cleanValue) return "Време не е внесено";

  if (cleanValue.includes("T")) {
    const date = new Date(cleanValue);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("mk-MK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      }).format(date);
    }
  }

  return cleanValue;
}

function ContactAndLocation() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-12">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="min-w-0 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <Phone className="text-yellow-300" />
            <h2 className="text-2xl font-black">Контакт</h2>
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

        <div className="min-w-0 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur sm:p-6">
  <div className="mb-4 flex items-center gap-3">
    <MapPin className="text-yellow-300" />
    <h2 className="text-2xl font-black">Локација</h2>
  </div>


  <div className="overflow-hidden rounded-2xl border border-white/20">
    <iframe
      title="Локација на турнирот"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186.9380548983449!2d22.632529259669937!3d41.43902900443827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a9ff595a5bf975%3A0x5dc35af2851e2c30!2sSports%20Playground%20%22Chiflik%22!5e0!3m2!1sen!2smk!4v1779232442039!5m2!1sen!2smk"
      width="100%"
      height="260"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>

</div>
      </div>
    </section>
  );
}

function PageSection({ title, subtitle, children }) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-12 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="break-words text-3xl font-black sm:text-4xl lg:text-5xl">{title}</h1>
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
      <p className="break-words text-lg font-black">{text}</p>
    </div>
  );
}
