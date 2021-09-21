interface Municipality {
  id: number;
  name: string;
  city: string;
  state_code: number;
  state: string;
}

const municipalitiesUnsorted: Municipality[] = [
  {
    id: 18,
    name: "Askola",
    city: "018 Askola",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 49,
    name: "Espoo",
    city: "049 Espoo",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 78,
    name: "Hanko",
    city: "078 Hanko",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 91,
    name: "Helsinki",
    city: "091 Helsinki",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 92,
    name: "Vantaa",
    city: "092 Vantaa",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 106,
    name: "Hyvinkää",
    city: "106 Hyvinkää",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 149,
    name: "Ingå",
    city: "149 Ingå",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 186,
    name: "Järvenpää",
    city: "186 Järvenpää",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 224,
    name: "Karkkila",
    city: "224 Karkkila",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 235,
    name: "Kauniainen",
    city: "235 Kauniainen",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 245,
    name: "Kerava",
    city: "245 Kerava",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 257,
    name: "Kirkkonummi",
    city: "257 Kirkkonummi",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 407,
    name: "Lapinjärvi",
    city: "407 Lapinjärvi",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 434,
    name: "Loviisa",
    city: "434 Loviisa",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 444,
    name: "Lohja",
    city: "444 Lohja",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 504,
    name: "Myrskylä",
    city: "504 Myrskylä",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 505,
    name: "Mäntsälä",
    city: "505 Mäntsälä",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 543,
    name: "Nurmijärvi",
    city: "543 Nurmijärvi",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 611,
    name: "Pornainen",
    city: "611 Pornainen",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 616,
    name: "Pukkila",
    city: "616 Pukkila",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 638,
    name: "Porvoo",
    city: "638 Porvoo",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 710,
    name: "Raasepori",
    city: "710 Raasepori",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 753,
    name: "Sipoo",
    city: "753 Sipoo",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 755,
    name: "Siuntio",
    city: "755 Siuntio",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 858,
    name: "Tuusula",
    city: "858 Tuusula",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 927,
    name: "Vihti",
    city: "927 Vihti",
    state_code: 1,
    state: "Uusimaa",
  },
  {
    id: 19,
    name: "Aura",
    city: "019 Aura",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 202,
    name: "Kaarina",
    city: "202 Kaarina",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 284,
    name: "Koski Tl",
    city: "284 Koski Tl",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 304,
    name: "Kustavi",
    city: "304 Kustavi",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 322,
    name: "Kimitoön",
    city: "322 Kimitoön",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 400,
    name: "Laitila",
    city: "400 Laitila",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 423,
    name: "Lieto",
    city: "423 Lieto",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 430,
    name: "Loimaa",
    city: "430 Loimaa",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 445,
    name: "Pargas",
    city: "445 Pargas",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 480,
    name: "Marttila",
    city: "480 Marttila",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 481,
    name: "Masku",
    city: "481 Masku",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 503,
    name: "Mynämäki",
    city: "503 Mynämäki",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 529,
    name: "Naantali",
    city: "529 Naantali",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 538,
    name: "Nousiainen",
    city: "538 Nousiainen",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 561,
    name: "Oripää",
    city: "561 Oripää",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 577,
    name: "Paimio",
    city: "577 Paimio",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 631,
    name: "Pyhäranta",
    city: "631 Pyhäranta",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 636,
    name: "Pöytyä",
    city: "636 Pöytyä",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 680,
    name: "Raisio",
    city: "680 Raisio",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 704,
    name: "Rusko",
    city: "704 Rusko",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 734,
    name: "Salo",
    city: "734 Salo",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 738,
    name: "Sauvo",
    city: "738 Sauvo",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 761,
    name: "Somero",
    city: "761 Somero",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 833,
    name: "Taivassalo",
    city: "833 Taivassalo",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 853,
    name: "Turku",
    city: "853 Turku",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 895,
    name: "Uusikaupunki",
    city: "895 Uusikaupunki",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 918,
    name: "Vehmaa",
    city: "918 Vehmaa",
    state_code: 2,
    state: "Southwest Finland",
  },
  {
    id: 50,
    name: "Eura",
    city: "050 Eura",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 51,
    name: "Eurajoki",
    city: "051 Eurajoki",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 79,
    name: "Harjavalta",
    city: "079 Harjavalta",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 99,
    name: "Honkajoki",
    city: "099 Honkajoki",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 102,
    name: "Huittinen",
    city: "102 Huittinen",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 181,
    name: "Jämijärvi",
    city: "181 Jämijärvi",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 214,
    name: "Kankaanpää",
    city: "214 Kankaanpää",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 230,
    name: "Karvia",
    city: "230 Karvia",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 271,
    name: "Kokemäki",
    city: "271 Kokemäki",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 484,
    name: "Merikarvia",
    city: "484 Merikarvia",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 531,
    name: "Nakkila",
    city: "531 Nakkila",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 608,
    name: "Pomarkku",
    city: "608 Pomarkku",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 609,
    name: "Pori",
    city: "609 Pori",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 684,
    name: "Rauma",
    city: "684 Rauma",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 747,
    name: "Siikainen",
    city: "747 Siikainen",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 783,
    name: "Säkylä",
    city: "783 Säkylä",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 886,
    name: "Ulvila",
    city: "886 Ulvila",
    state_code: 4,
    state: "Satakunta",
  },
  {
    id: 61,
    name: "Forssa",
    city: "061 Forssa",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 82,
    name: "Hattula",
    city: "082 Hattula",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 86,
    name: "Hausjärvi",
    city: "086 Hausjärvi",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 103,
    name: "Humppila",
    city: "103 Humppila",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 109,
    name: "Hämeenlinna",
    city: "109 Hämeenlinna",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 165,
    name: "Janakkala",
    city: "165 Janakkala",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 169,
    name: "Jokioinen",
    city: "169 Jokioinen",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 433,
    name: "Loppi",
    city: "433 Loppi",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 694,
    name: "Riihimäki",
    city: "694 Riihimäki",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 834,
    name: "Tammela",
    city: "834 Tammela",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 981,
    name: "Ypäjä",
    city: "981 Ypäjä",
    state_code: 5,
    state: "Kanta-Häme",
  },
  {
    id: 20,
    name: "Akaa",
    city: "020 Akaa",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 108,
    name: "Hämeenkyrö",
    city: "108 Hämeenkyrö",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 143,
    name: "Ikaalinen",
    city: "143 Ikaalinen",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 177,
    name: "Juupajoki",
    city: "177 Juupajoki",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 211,
    name: "Kangasala",
    city: "211 Kangasala",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 250,
    name: "Kihniö",
    city: "250 Kihniö",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 418,
    name: "Lempäälä",
    city: "418 Lempäälä",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 508,
    name: "Mänttä-Vilppula",
    city: "508 Mänttä-Vilppula",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 536,
    name: "Nokia",
    city: "536 Nokia",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 562,
    name: "Orivesi",
    city: "562 Orivesi",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 581,
    name: "Parkano",
    city: "581 Parkano",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 604,
    name: "Pirkkala",
    city: "604 Pirkkala",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 619,
    name: "Punkalaidun",
    city: "619 Punkalaidun",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 635,
    name: "Pälkäne",
    city: "635 Pälkäne",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 702,
    name: "Ruovesi",
    city: "702 Ruovesi",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 790,
    name: "Sastamala",
    city: "790 Sastamala",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 837,
    name: "Tampere",
    city: "837 Tampere",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 887,
    name: "Urjala",
    city: "887 Urjala",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 908,
    name: "Valkeakoski",
    city: "908 Valkeakoski",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 922,
    name: "Vesilahti",
    city: "922 Vesilahti",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 936,
    name: "Virrat",
    city: "936 Virrat",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 980,
    name: "Ylöjärvi",
    city: "980 Ylöjärvi",
    state_code: 6,
    state: "Pirkanmaa",
  },
  {
    id: 16,
    name: "Asikkala",
    city: "016 Asikkala",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 81,
    name: "Hartola",
    city: "081 Hartola",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 98,
    name: "Hollola",
    city: "098 Hollola",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 111,
    name: "Heinola",
    city: "111 Heinola",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 316,
    name: "Kärkölä",
    city: "316 Kärkölä",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 398,
    name: "Lahti",
    city: "398 Lahti",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 560,
    name: "Orimattila",
    city: "560 Orimattila",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 576,
    name: "Padasjoki",
    city: "576 Padasjoki",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 781,
    name: "Sysmä",
    city: "781 Sysmä",
    state_code: 7,
    state: "Päijät-Häme",
  },
  {
    id: 75,
    name: "Hamina",
    city: "075 Hamina",
    state_code: 8,
    state: "Kymenlaakso",
  },
  {
    id: 142,
    name: "Iitti",
    city: "142 Iitti",
    state_code: 8,
    state: "Kymenlaakso",
  },
  {
    id: 285,
    name: "Kotka",
    city: "285 Kotka",
    state_code: 8,
    state: "Kymenlaakso",
  },
  {
    id: 286,
    name: "Kouvola",
    city: "286 Kouvola",
    state_code: 8,
    state: "Kymenlaakso",
  },
  {
    id: 489,
    name: "Miehikkälä",
    city: "489 Miehikkälä",
    state_code: 8,
    state: "Kymenlaakso",
  },
  {
    id: 624,
    name: "Pyhtää",
    city: "624 Pyhtää",
    state_code: 8,
    state: "Kymenlaakso",
  },
  {
    id: 935,
    name: "Virolahti",
    city: "935 Virolahti",
    state_code: 8,
    state: "Kymenlaakso",
  },
  {
    id: 153,
    name: "Imatra",
    city: "153 Imatra",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 405,
    name: "Lappeenranta",
    city: "405 Lappeenranta",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 416,
    name: "Lemi",
    city: "416 Lemi",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 441,
    name: "Luumäki",
    city: "441 Luumäki",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 580,
    name: "Parikkala",
    city: "580 Parikkala",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 689,
    name: "Rautjärvi",
    city: "689 Rautjärvi",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 700,
    name: "Ruokolahti",
    city: "700 Ruokolahti",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 739,
    name: "Savitaipale",
    city: "739 Savitaipale",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 831,
    name: "Taipalsaari",
    city: "831 Taipalsaari",
    state_code: 9,
    state: "South Karelia",
  },
  {
    id: 46,
    name: "Enonkoski",
    city: "046 Enonkoski",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 90,
    name: "Heinävesi",
    city: "090 Heinävesi",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 97,
    name: "Hirvensalmi",
    city: "097 Hirvensalmi",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 171,
    name: "Joroinen",
    city: "171 Joroinen",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 178,
    name: "Juva",
    city: "178 Juva",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 213,
    name: "Kangasniemi",
    city: "213 Kangasniemi",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 491,
    name: "Mikkeli",
    city: "491 Mikkeli",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 507,
    name: "Mäntyharju",
    city: "507 Mäntyharju",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 588,
    name: "Pertunmaa",
    city: "588 Pertunmaa",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 593,
    name: "Pieksämäki",
    city: "593 Pieksämäki",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 623,
    name: "Puumala",
    city: "623 Puumala",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 681,
    name: "Rantasalmi",
    city: "681 Rantasalmi",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 740,
    name: "Savonlinna",
    city: "740 Savonlinna",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 768,
    name: "Sulkava",
    city: "768 Sulkava",
    state_code: 10,
    state: "South Savo",
  },
  {
    id: 140,
    name: "Iisalmi",
    city: "140 Iisalmi",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 204,
    name: "Kaavi",
    city: "204 Kaavi",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 239,
    name: "Keitele",
    city: "239 Keitele",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 263,
    name: "Kiuruvesi",
    city: "263 Kiuruvesi",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 297,
    name: "Kuopio",
    city: "297 Kuopio",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 402,
    name: "Lapinlahti",
    city: "402 Lapinlahti",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 420,
    name: "Leppävirta",
    city: "420 Leppävirta",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 595,
    name: "Pielavesi",
    city: "595 Pielavesi",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 686,
    name: "Rautalampi",
    city: "686 Rautalampi",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 687,
    name: "Rautavaara",
    city: "687 Rautavaara",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 749,
    name: "Siilinjärvi",
    city: "749 Siilinjärvi",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 762,
    name: "Sonkajärvi",
    city: "762 Sonkajärvi",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 778,
    name: "Suonenjoki",
    city: "778 Suonenjoki",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 844,
    name: "Tervo",
    city: "844 Tervo",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 857,
    name: "Tuusniemi",
    city: "857 Tuusniemi",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 915,
    name: "Varkaus",
    city: "915 Varkaus",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 921,
    name: "Vesanto",
    city: "921 Vesanto",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 925,
    name: "Vieremä",
    city: "925 Vieremä",
    state_code: 11,
    state: "North Savo",
  },
  {
    id: 146,
    name: "Ilomantsi",
    city: "146 Ilomantsi",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 167,
    name: "Joensuu",
    city: "167 Joensuu",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 176,
    name: "Juuka",
    city: "176 Juuka",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 260,
    name: "Kitee",
    city: "260 Kitee",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 276,
    name: "Kontiolahti",
    city: "276 Kontiolahti",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 309,
    name: "Outokumpu",
    city: "309 Outokumpu",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 422,
    name: "Lieksa",
    city: "422 Lieksa",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 426,
    name: "Liperi",
    city: "426 Liperi",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 541,
    name: "Nurmes",
    city: "541 Nurmes",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 607,
    name: "Polvijärvi",
    city: "607 Polvijärvi",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 707,
    name: "Rääkkylä",
    city: "707 Rääkkylä",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 848,
    name: "Tohmajärvi",
    city: "848 Tohmajärvi",
    state_code: 12,
    state: "North Karelia",
  },
  {
    id: 77,
    name: "Hankasalmi",
    city: "077 Hankasalmi",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 172,
    name: "Joutsa",
    city: "172 Joutsa",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 179,
    name: "Jyväskylä",
    city: "179 Jyväskylä",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 182,
    name: "Jämsä",
    city: "182 Jämsä",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 216,
    name: "Kannonkoski",
    city: "216 Kannonkoski",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 226,
    name: "Karstula",
    city: "226 Karstula",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 249,
    name: "Keuruu",
    city: "249 Keuruu",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 256,
    name: "Kinnula",
    city: "256 Kinnula",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 265,
    name: "Kivijärvi",
    city: "265 Kivijärvi",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 275,
    name: "Konnevesi",
    city: "275 Konnevesi",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 291,
    name: "Kuhmoinen",
    city: "291 Kuhmoinen",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 312,
    name: "Kyyjärvi",
    city: "312 Kyyjärvi",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 410,
    name: "Laukaa",
    city: "410 Laukaa",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 435,
    name: "Luhanka",
    city: "435 Luhanka",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 495,
    name: "Multia",
    city: "495 Multia",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 500,
    name: "Muurame",
    city: "500 Muurame",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 592,
    name: "Petäjävesi",
    city: "592 Petäjävesi",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 601,
    name: "Pihtipudas",
    city: "601 Pihtipudas",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 729,
    name: "Saarijärvi",
    city: "729 Saarijärvi",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 850,
    name: "Toivakka",
    city: "850 Toivakka",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 892,
    name: "Uurainen",
    city: "892 Uurainen",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 931,
    name: "Viitasaari",
    city: "931 Viitasaari",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 992,
    name: "Äänekoski",
    city: "992 Äänekoski",
    state_code: 13,
    state: "Central Finland",
  },
  {
    id: 5,
    name: "Alajärvi",
    city: "005 Alajärvi",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 10,
    name: "Alavus",
    city: "010 Alavus",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 52,
    name: "Evijärvi",
    city: "052 Evijärvi",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 145,
    name: "Ilmajoki",
    city: "145 Ilmajoki",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 151,
    name: "Isojoki",
    city: "151 Isojoki",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 218,
    name: "Karijoki",
    city: "218 Karijoki",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 232,
    name: "Kauhajoki",
    city: "232 Kauhajoki",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 233,
    name: "Kauhava",
    city: "233 Kauhava",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 300,
    name: "Kuortane",
    city: "300 Kuortane",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 301,
    name: "Kurikka",
    city: "301 Kurikka",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 403,
    name: "Lappajärvi",
    city: "403 Lappajärvi",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 408,
    name: "Lapua",
    city: "408 Lapua",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 743,
    name: "Seinäjoki",
    city: "743 Seinäjoki",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 759,
    name: "Soini",
    city: "759 Soini",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 846,
    name: "Teuva",
    city: "846 Teuva",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 934,
    name: "Vimpeli",
    city: "934 Vimpeli",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 989,
    name: "Ähtäri",
    city: "989 Ähtäri",
    state_code: 14,
    state: "South Ostrobothnia",
  },
  {
    id: 152,
    name: "Isokyrö",
    city: "152 Isokyrö",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 231,
    name: "Kaskinen",
    city: "231 Kaskinen",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 280,
    name: "Korsnäs",
    city: "280 Korsnäs",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 287,
    name: "Kristinestad",
    city: "287 Kristinestad",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 288,
    name: "Kronoby",
    city: "288 Kronoby",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 399,
    name: "Laihia",
    city: "399 Laihia",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 440,
    name: "Larsmo",
    city: "440 Larsmo",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 475,
    name: "Malax",
    city: "475 Malax",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 499,
    name: "Korsholm",
    city: "499 Korsholm",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 545,
    name: "Närpes",
    city: "545 Närpes",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 598,
    name: "Jakobstad",
    city: "598 Jakobstad",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 599,
    name: "Pedersöre",
    city: "599 Pedersöre",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 893,
    name: "Nykarleby",
    city: "893 Nykarleby",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 905,
    name: "Vaasa",
    city: "905 Vaasa",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 946,
    name: "Vöyri",
    city: "946 Vöyri",
    state_code: 15,
    state: "Ostrobothnia",
  },
  {
    id: 74,
    name: "Halsua",
    city: "074 Halsua",
    state_code: 16,
    state: "Central Ostrobothnia",
  },
  {
    id: 217,
    name: "Kannus",
    city: "217 Kannus",
    state_code: 16,
    state: "Central Ostrobothnia",
  },
  {
    id: 236,
    name: "Kaustinen",
    city: "236 Kaustinen",
    state_code: 16,
    state: "Central Ostrobothnia",
  },
  {
    id: 272,
    name: "Kokkola",
    city: "272 Kokkola",
    state_code: 16,
    state: "Central Ostrobothnia",
  },
  {
    id: 421,
    name: "Lestijärvi",
    city: "421 Lestijärvi",
    state_code: 16,
    state: "Central Ostrobothnia",
  },
  {
    id: 584,
    name: "Perho",
    city: "584 Perho",
    state_code: 16,
    state: "Central Ostrobothnia",
  },
  {
    id: 849,
    name: "Toholampi",
    city: "849 Toholampi",
    state_code: 16,
    state: "Central Ostrobothnia",
  },
  {
    id: 924,
    name: "Veteli",
    city: "924 Veteli",
    state_code: 16,
    state: "Central Ostrobothnia",
  },
  {
    id: 9,
    name: "Alavieska",
    city: "009 Alavieska",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 69,
    name: "Haapajärvi",
    city: "069 Haapajärvi",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 71,
    name: "Haapavesi",
    city: "071 Haapavesi",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 72,
    name: "Hailuoto",
    city: "072 Hailuoto",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 139,
    name: "Ii",
    city: "139 Ii",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 208,
    name: "Kalajoki",
    city: "208 Kalajoki",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 244,
    name: "Kempele",
    city: "244 Kempele",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 305,
    name: "Kuusamo",
    city: "305 Kuusamo",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 317,
    name: "Kärsämäki",
    city: "317 Kärsämäki",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 425,
    name: "Liminka",
    city: "425 Liminka",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 436,
    name: "Lumijoki",
    city: "436 Lumijoki",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 483,
    name: "Merijärvi",
    city: "483 Merijärvi",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 494,
    name: "Muhos",
    city: "494 Muhos",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 535,
    name: "Nivala",
    city: "535 Nivala",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 563,
    name: "Oulainen",
    city: "563 Oulainen",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 564,
    name: "Oulu",
    city: "564 Oulu",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 615,
    name: "Pudasjärvi",
    city: "615 Pudasjärvi",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 625,
    name: "Pyhäjoki",
    city: "625 Pyhäjoki",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 626,
    name: "Pyhäjärvi",
    city: "626 Pyhäjärvi",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 630,
    name: "Pyhäntä",
    city: "630 Pyhäntä",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 678,
    name: "Raahe",
    city: "678 Raahe",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 691,
    name: "Reisjärvi",
    city: "691 Reisjärvi",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 746,
    name: "Sievi",
    city: "746 Sievi",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 748,
    name: "Siikajoki",
    city: "748 Siikajoki",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 785,
    name: "Vaala",
    city: "785 Vaala",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 791,
    name: "Siikalatva",
    city: "791 Siikalatva",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 832,
    name: "Taivalkoski",
    city: "832 Taivalkoski",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 859,
    name: "Tyrnävä",
    city: "859 Tyrnävä",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 889,
    name: "Utajärvi",
    city: "889 Utajärvi",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 977,
    name: "Ylivieska",
    city: "977 Ylivieska",
    state_code: 17,
    state: "North Ostrobothnia",
  },
  {
    id: 105,
    name: "Hyrynsalmi",
    city: "105 Hyrynsalmi",
    state_code: 18,
    state: "Kainuu",
  },
  {
    id: 205,
    name: "Kajaani",
    city: "205 Kajaani",
    state_code: 18,
    state: "Kainuu",
  },
  {
    id: 290,
    name: "Kuhmo",
    city: "290 Kuhmo",
    state_code: 18,
    state: "Kainuu",
  },
  {
    id: 578,
    name: "Paltamo",
    city: "578 Paltamo",
    state_code: 18,
    state: "Kainuu",
  },
  {
    id: 620,
    name: "Puolanka",
    city: "620 Puolanka",
    state_code: 18,
    state: "Kainuu",
  },
  {
    id: 697,
    name: "Ristijärvi",
    city: "697 Ristijärvi",
    state_code: 18,
    state: "Kainuu",
  },
  {
    id: 765,
    name: "Sotkamo",
    city: "765 Sotkamo",
    state_code: 18,
    state: "Kainuu",
  },
  {
    id: 777,
    name: "Suomussalmi",
    city: "777 Suomussalmi",
    state_code: 18,
    state: "Kainuu",
  },
  {
    id: 47,
    name: "Enontekiö",
    city: "047 Enontekiö",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 148,
    name: "Inari",
    city: "148 Inari",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 240,
    name: "Kemi",
    city: "240 Kemi",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 241,
    name: "Keminmaa",
    city: "241 Keminmaa",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 261,
    name: "Kittilä",
    city: "261 Kittilä",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 273,
    name: "Kolari",
    city: "273 Kolari",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 320,
    name: "Kemijärvi",
    city: "320 Kemijärvi",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 498,
    name: "Muonio",
    city: "498 Muonio",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 583,
    name: "Pelkosenniemi",
    city: "583 Pelkosenniemi",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 614,
    name: "Posio",
    city: "614 Posio",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 683,
    name: "Ranua",
    city: "683 Ranua",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 698,
    name: "Rovaniemi",
    city: "698 Rovaniemi",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 732,
    name: "Salla",
    city: "732 Salla",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 742,
    name: "Savukoski",
    city: "742 Savukoski",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 751,
    name: "Simo",
    city: "751 Simo",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 758,
    name: "Sodankylä",
    city: "758 Sodankylä",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 845,
    name: "Tervola",
    city: "845 Tervola",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 851,
    name: "Tornio",
    city: "851 Tornio",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 854,
    name: "Pello",
    city: "854 Pello",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 890,
    name: "Utsjoki",
    city: "890 Utsjoki",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 976,
    name: "Ylitornio",
    city: "976 Ylitornio",
    state_code: 19,
    state: "Lapland",
  },
  {
    id: 35,
    name: "Brändö",
    city: "035 Brändö",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 43,
    name: "Eckerö",
    city: "043 Eckerö",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 60,
    name: "Finström",
    city: "060 Finström",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 62,
    name: "Föglö",
    city: "062 Föglö",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 65,
    name: "Geta",
    city: "065 Geta",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 76,
    name: "Hammarland",
    city: "076 Hammarland",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 170,
    name: "Jomala",
    city: "170 Jomala",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 295,
    name: "Kumlinge",
    city: "295 Kumlinge",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 318,
    name: "Kökar",
    city: "318 Kökar",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 417,
    name: "Lemland",
    city: "417 Lemland",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 438,
    name: "Lumparland",
    city: "438 Lumparland",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 478,
    name: "Mariehamn",
    city: "478 Mariehamn",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 736,
    name: "Saltvik",
    city: "736 Saltvik",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 766,
    name: "Sottunga",
    city: "766 Sottunga",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 771,
    name: "Sund",
    city: "771 Sund",
    state_code: 21,
    state: "Åland",
  },
  {
    id: 941,
    name: "Vårdö",
    city: "941 Vårdö",
    state_code: 21,
    state: "Åland",
  },
];

export const municipalities = municipalitiesUnsorted.sort(
  (a, b) => a.id - b.id
);
