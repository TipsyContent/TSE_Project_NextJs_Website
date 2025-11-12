import { formatTournamentDate, formatTournamentTime } from '@/lib/utils/dateAndTimeFormatter';
import { fetchData } from '@/lib/fetchData';

export default async function TestTournamentsPage() {
  // Hent data fra API
  const apiData = await fetchData();
  

  
  // Tag de første 3
  const topThree = apiData.data.results.slice(0, 3);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Næste 3 Tournaments</h1>
      
      {topThree.length === 0 ? (
        <p>Ingen planlagte tournaments</p>
      ) : (
        <div className="space-y-4">
          {topThree.map((tournament: any) => (
            <div key={tournament.match.id} className="border p-4 rounded">
              <h3 className="font-bold">{tournament.event.name}</h3>
            
              <p>Dato: {formatTournamentDate(tournament.utc)}</p>
              <p>Tid: {formatTournamentTime(tournament.utc)}</p>
              <p>Original dato og tid: {tournament.utc}</p>
              
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {tournament.teams[0].name} vs {tournament.teams[1].name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
