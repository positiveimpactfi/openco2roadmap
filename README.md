# Open CO2 roadmap

This is an open source carbon footprint calculator project created by [Positive Impact](https://www.positiveimpact.fi). The latest releases are made for Carbon Neutral Tourism (CNT) project by the cities of Helsinki, Turku and Tampere. The first release of the project in November 2021 was made for the [Regional Council of Lapland](https://www.lapinliitto.fi/en/), and funded by [European Regional Development fund (ERDF)](http://www.rakennerahastot.fi/web/en). 

<div style="display:flex">
  <img src="https://user-images.githubusercontent.com/42574232/147139890-593c7ac5-3d95-472c-aaa3-783586161fab.png" alt="CNT project logos">
</div>
The calculator is initially designed to serve small and medium size companies in the travel industry in Finland. This is reflected both in the calculator boundary and emission factor library.

## Available documentation

- [Current and upcoming features](docs/features.md)
- [Calculation methodology (in Finnish only)](https://docs.google.com/document/d/1CvHBqop9aaz7wTSQzzQz7qYP0S1VqrNNqfVHhqnYONQ/edit?usp=sharing)
- [User journey and architecture diagrams](https://miro.com/app/board/o9J_l_ZRMF8=/)

Demo is available at [app.co2roadmap.fi](https://app.co2roadmap.fi) (currently invite-only).

## Project structure

- `docs`: contains common documentation
- `server`: source code for the backend Node server
- `shared`: shared files between the backend and the frontend
- `web`: source code for the frontend NextJS application

The backend and the frontend are deployed separately, and the instructions can be found from their respective folders.
