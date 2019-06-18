// EXAMPLE OF LOCAL STORAGE
//
// games: [
//     { name: 'diego,' matches: [{ date: 123, points: 2, maxSong: 3, currentSongIndex: 2 }] }},
//     { name: 'diego,' matches: [{ date: 123, points: 2, maxSong: 3, currentSongIndex: 2 }] }},
// ],
// user: {
//     name: 'diego',
//     // maybe loginLayerActive: false
//   }
// }

const GetItem = key => {
  return JSON.parse(localStorage.getItem(key));
};
const SetItem = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
const GetLS = () => {
  return GetItem("whosings");
};
const SetLS = ls => {
  SetItem("whosings", ls);
};

export const InitEmptyLSIfNeeded = () => {
  if (GetLS() === null) {
    SetLS({
      games: [],
      user: null
    });
  }
};

export const AllGames = () => {
  return GetLS().games;
};

export const GetGamesPlayer = name => {
  const games = AllGames();
  if (games) return games.filter(g => g.name === name);
  return null;
};

export const UpdateMatches = (name, gameState) => {
  const games = [
    ...AllGames(),
    {
      name,
      date: gameState.date,
      points: gameState.points,
      maxSong: gameState.maxSong,
      currentSongIndex: gameState.currentSongIndex
    }
  ];

  SetLS({
    ...GetLS(),
    games
  });
};

export const GetUser = () => {
  return GetLS().user;
};

export const SetUser = name => {
  SetLS({
    ...GetLS(),
    user: { name }
  });
};

export const DeleteUser = () => {
  SetLS({
    ...GetItem(),
    user: null
  });
};

export const DEBUG_LS = () => {
  console.log(GetLS());
};

window.DEBUG_LS = DEBUG_LS;

/**
 * cambio logica.
 * un singolo metodo per salvare su localstorage
 * un singolo metodo per leggere
 * tanti metodo per avere un estratto del punto precedente
 */
