export interface BusinessField {
  id: number;
  name: string;
  description?: string;
}

const compareString = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const businessFields: BusinessField[] = [
  {
    id: 1,
    name: "Majoitustoiminta",
  },
  {
    id: 2,
    name: "Ravitsemistoiminta",
  },
  {
    id: 3,
    name: "Henkilöliikenne",
  },
  {
    id: 4,
    name: "Välineiden vuokraus",
  },
  {
    id: 5,
    name: "Matkatoimistot, matkanjärjestäjät, varauspalvelut",
  },
  {
    id: 6,
    name: "DMC",
  },
  {
    id: 7,
    name: "Ohjelmapalvelut",
  },
  {
    id: 8,
    name: "Teema- ja kulttuurikäyntikohteet ja niiden palvelut",
  },
  {
    id: 9,
    name: "Urheilu / liikuntakohteet ja niiden palvelut",
  },
  {
    id: 10,
    name: "Luontokohteiden palvelut",
  },
  {
    id: 11,
    name: "Vierasvenesatamat",
  },
  {
    id: 12,
    name: "Henkilölaivaliikenne",
  },
  {
    id: 13,
    name: "Kokous, kongressi ja tapahtumatoiminta",
  },
  {
    id: 14,
    name: "Vähittäiskauppa",
  },
].sort((a, b) => compareString(a.name, b.name));
