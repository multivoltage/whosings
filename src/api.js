import "cross-fetch/polyfill";
import queryString from 'query-string';
import { UpdateMatches } from './ls';

const BASE_API = 'https://api.musixmatch.com/ws/1.1/';
const TOP_ARTTIST_LIST = 'chart.artists.get';
const TOP_SONG_LIST = 'chart.tracks.get';
const LYRICS = 'track.lyrics.get';
const API_KEY = 'e9da7197d56595fa7daf3531adf0530b';
export const DEFAULT_TIME_FOR_TRACK = 4000// + 1000 * 60 * 3;


const concatParams = (paramsObj) => {
  var newObj = {
    apikey: API_KEY,
    format: 'json',
    ...paramsObj
  }
  return queryString.stringify(newObj)
}

const request = async (api, paramsObj) => {
  const res = await fetch(BASE_API + api + '?' + concatParams(paramsObj), { method: 'GET' })
  const { message } = await res.json();
  const body = message.body;
  return body;
}

export const shuffle = (array) => {//return array
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const topSongList = async () => {
  const r = await request(TOP_SONG_LIST, {
    country: 'IT',
    page_size: 100,
    chart_name: 'top',
    f_has_lyrics: true
  })
  return shuffle(r.track_list);
}

export const getTrackLyric = async (track_id) => {
  const r = await request(LYRICS, { track_id })
  return r.lyrics;
};

const getRandomFrom = (excludedArtist = [], availableArtist) => {
  var min = Math.ceil(0);
  var max = Math.floor(availableArtist.size);

  const index = Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
  const randomArtist = Array.from(availableArtist)[index];

  if (!excludedArtist.includes(randomArtist))
    return randomArtist;
  else
    return getRandomFrom(excludedArtist, availableArtist);
}

// troppe chiamate api? 300 ms per tutto :)
export const buildSchema = async () => {

  var availableArtist = new Set();
  var songs = await topSongList();
  songs = songs.map(async ({ track }) => {

    const lyrics = await getTrackLyric(track.track_id);
    // availableArtist è la somma di tutti gli artist di ogni canzone
    availableArtist.add(track.artist_name);
    return {
      lyrics: lyrics.lyrics_body,
      track_id: track.track_id,
      track_name: track.track_name,
      artist_id: track.artist_id,
      artist_name: track.artist_name
    }
  })

  songs = await Promise.all(songs);

  songs = songs.map((track) => {
    const r0 = track.artist_name
    const r1 = getRandomFrom([track.artist_name], availableArtist)
    const r2 = getRandomFrom([track.artist_name, r1], availableArtist)
    const choices = shuffle([r0, r1, r2]);

    return {
      ...track,
      choices
    }
  })
  const game = {
    songs,
    availableArtist,
    currentSongIndex: 0
  }

  return game;
}
