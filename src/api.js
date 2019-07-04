// import 'cross-fetch/polyfill'
import queryString from 'query-string'
const HOST_ROOT = process.env.HOST_ROOT || 'http://localhost:5000/api/mm/'
const TOP_SONG_LIST = 'songs'
const LYRICS = 'lyric'
const SCHEMA = 'schema'
export const DEFAULT_TIME_FOR_TRACK = 4000 // + 1000 * 60 * 3;

const concatParams = paramsObj => queryString.stringify(paramsObj)

const request = async (ENDPOINT, paramsObj) => {
  const res = await fetch(HOST_ROOT + '/' + ENDPOINT + '?' + concatParams(paramsObj), {
    method: 'GET',
  })
  const r = await res.json()
  return r
}

export const topSongList = async () => {
  return await request(TOP_SONG_LIST)
}

export const getTrackLyric = async track_id => {
  const r = await request(LYRICS, { track_id })
  return r.lyrics
}

const getRandomFrom = (excludedArtist = [], availableArtist) => {
  var min = Math.ceil(0)
  var max = Math.floor(availableArtist.size)

  const index = Math.floor(Math.random() * (max - min)) + min //Il max è escluso e il min è incluso
  const randomArtist = Array.from(availableArtist)[index]

  if (!excludedArtist.includes(randomArtist)) return randomArtist
  else return getRandomFrom(excludedArtist, availableArtist)
}

// troppe chiamate api? 300 ms per tutto :)
export const buildSchema = async () => {
  return await request(SCHEMA)
}
