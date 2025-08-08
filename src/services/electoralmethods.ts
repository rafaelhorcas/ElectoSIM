type Vote = { party: string; votes: number };
type SeatResult = { party: string; seats: number };

export function dhondt(votes: Vote[], totalSeats: number): SeatResult[] {

  if (totalSeats <= 0 || !Number.isInteger(totalSeats)) {throw new Error("El número de escaños debe ser un entero positivo");}
  if (votes.some(v => v.votes < 0)) {throw new Error("Los votos no pueden ser negativos");}

  const seatCounts: Record<string, number> = {};
  const divisors: Record<string, number[]> = {};
  
  votes.forEach(v => {
    seatCounts[v.party] = 0;
    divisors[v.party] = Array.from({ length: totalSeats }, (_, i) => i + 1);
  });
  
  // Algoritmo D'Hondt
  for (let i = 0; i < totalSeats; i++) {
    let bestParty: string | null = null;
    let bestQuotient = -Infinity;

    for (const v of votes) {
      const currentSeats = seatCounts[v.party];
      const partyDivisors = divisors[v.party];
      
      // Verificación de seguridad
      if (currentSeats === undefined) {
        throw new Error(`Datos no inicializados para el partido ${v.party}`);
      }
      if (partyDivisors === undefined) {
        throw new Error(`Datos no inicializados para el partido ${v.party}`);
      }
      const divisor = partyDivisors[currentSeats];

      if (divisor === undefined) {
        throw new Error(`No divisor definido para el partido ${v.party} en el asiento ${currentSeats}`);
      }
      const quotient = v.votes / divisor;
      
      if (quotient > bestQuotient) {
        bestQuotient = quotient;
        bestParty = v.party;
      }
    }

    // Validación final
    if (bestParty === null) {
      throw new Error("No se pudo asignar el escaño: ningún partido cumplió la condición");
    }

    seatCounts[bestParty]!++;
  }
  
  return votes.map(v => ({
    party: v.party,
    seats: seatCounts[v.party] ?? 0
  }));

}

export function sainteLague(votes: Vote[], totalSeats: number): SeatResult[] {

  if (totalSeats <= 0 || !Number.isInteger(totalSeats)) {throw new Error("El número de escaños debe ser un entero positivo");}
  if (votes.some(v => v.votes < 0)) {throw new Error("Los votos no pueden ser negativos");}

  const seatCounts: Record<string, number> = {};
  const divisors: Record<string, number[]> = {};
  
  votes.forEach(v => {
    seatCounts[v.party] = 0;
    divisors[v.party] = Array.from({ length: totalSeats }, (_, i) => 2 * i + 1);
  });

  // Algoritmo Sainte-Laguë
  for (let i = 0; i < totalSeats; i++) {
    let bestParty: string | null = null;
    let bestQuotient = -Infinity;

    for (const v of votes) {
      const currentSeats = seatCounts[v.party];
      const partyDivisors = divisors[v.party];
      
      // Verificación de seguridad
      if (currentSeats === undefined) {
        throw new Error(`Datos no inicializados para el partido ${v.party}`);
      }
      if (partyDivisors === undefined) {
        throw new Error(`Datos no inicializados para el partido ${v.party}`);
      }
      const divisor = partyDivisors[currentSeats];

      if (divisor === undefined) {
        throw new Error(`No divisor definido para el partido ${v.party} en el asiento ${currentSeats}`);
      }
      const quotient = v.votes / divisor;
      
      if (quotient > bestQuotient) {
        bestQuotient = quotient;
        bestParty = v.party;
      }
    }

    // Validación final
    if (bestParty === null) {
      throw new Error("No se pudo asignar el escaño: ningún partido cumplió la condición");
    }

    seatCounts[bestParty]!++;
  }
  
  return votes.map(v => ({
    party: v.party,
    seats: seatCounts[v.party] ?? 0
  }));
}

