# E-Sports API

This project allows you to create advertisements for other players using the E-Sports API.

## Entities

### Game

List of itens on a game

- id
- name
- bannerURL

### Advertisements

List of itens on an ad

- id
- gameId
- name
- yearsPlaying
- discord
- weekDays
- hourStart
- hourEnd
- useVoiceChannel
- createdAt

## Use Cases

- [x] List of games with advertisements counts
- [x] Create a new advertisement for a game
- [x] List of advertisements by game
- [x] Search discord by advertisement id

## Technologies

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/index.html)
