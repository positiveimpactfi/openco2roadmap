interface EmissionComponent {
  name: string;
  categoryID: number;
}

export const emissionComponents: EmissionComponent[] = [
  {
    name: "Lämmitys",
    categoryID: 1,
  },
  {
    name: "Sähkönkulutus",
    categoryID: 1,
  },
  {
    name: "Vedenkulutus",
    categoryID: 1,
  },
  {
    name: "Kiinteistönhuollon polttoaineet",
    categoryID: 1,
  },
  {
    name: "Jätteet",
    categoryID: 1,
  },
  {
    name: "Tavarakuljetukset",
    categoryID: 2,
  },
  {
    name: "Asiakkaiden kuljetukset",
    categoryID: 2,
  },
  {
    name: "Työmatkat",
    categoryID: 2,
  },
  {
    name: "Elintarvikehankinnat",
    categoryID: 3,
  },
  {
    name: "Palveluhankinnat",
    categoryID: 3,
  },
  {
    name: "Muut hankinnat",
    categoryID: 3,
  },
  {
    name: "Yleiset hankinnat",
    categoryID: 4,
  },
  {
    name: "Muut hankinnat",
    categoryID: 4,
  },
];
