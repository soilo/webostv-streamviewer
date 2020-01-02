import { fetch } from 'whatwg-fetch';
import { join, filter, flatMap, forEach, map} from 'lodash-es'

const clientId = '***REMOVED***';
const api = 'https://api.twitch.tv/helix/';

export const fetchStreams = (callback, signal, id) => {
  callback({ streamIsLoading: true });
  fetch(api + 'streams' + (id ? '' : '?game_id=' + id), {
    headers: { 'Client-ID': clientId },
    signal: signal
  })
    .then(response => response.json())
    .then(streams => callback({
      streamIsLoading: false,
      streams: streams.data,
      streamPagination: streams.pagination
    }))
    .catch(err => callback({ steamHasErrored: true }));
}

export const fetchGames = (callback, signal) => {
  callback({ gameIsLoading: true });
  fetch(api + 'games/top', {
    headers: { 'Client-ID': clientId },
    signal: signal
  })
    .then(response => response.json())
    .then(games => callback({
      gameIsLoading: false,
      games: games.data,
      gamePagination: games.pagination
    }))
    .catch(err => callback({ gameHasErrored: true }));
}

export const enrichStreams = (callback, signal, streams) => {
  if (typeof streams !== 'undefined' &&
      streams.length > 0 &&
      typeof streams[0].game === 'undefined') {
    const paramMap = flatMap(streams, (stream) => 'id=' + stream.game_id)
    const params = '?' + join(paramMap, '&');
    fetch(api +'games' + params, {
      headers: { 'Client-ID': clientId },
      signal: signal
    })
      .then(response => response.json())
      .then(games => {
        forEach(streams, (stream) => {
          stream.game = filter(
            games,
            (game) => game.id === stream.game_id
          )[0]
        })
        callback({streams: treams})
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('abort')
        }
      });
  }
}
