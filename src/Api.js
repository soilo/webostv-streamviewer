import { fetch } from 'whatwg-fetch';
import request from 'superagent';
import { join, filter, flatMap, forEach, map} from 'lodash-es'

const clientId = '***REMOVED***';
const api = 'https://api.twitch.tv/helix/';

export const fetchStreams = (callback, id) => {
  callback({ streamIsLoading: true });
  request
    .get(api + 'streams' + (id ? '?game_id=' + id : ''))
    .set({'Client-ID': clientId })
    .accept('json')
    .then(res => callback({
      streamIsLoading: false,
      streams: res.body.data,
      streamPagination: res.body.pagination
    }))
    .catch(err => callback({ steamHasErrored: true }));
}

export const fetchGames = (callback) => {
  callback({ gameIsLoading: true });
  request
    .get(api + 'games/top')
    .set({ 'Client-ID': clientId })
    .accept('json')
    .then(res => callback({
      gameIsLoading: false,
      games: res.body.data,
      gamePagination: res.body.pagination
    }))
    .catch(err => callback({ gameHasErrored: true }));
}

export const enrichStreams = (callback, streams) => {
  if (typeof streams !== 'undefined' &&
      streams.length > 0 &&
      typeof streams[0].game === 'undefined') {
    const paramMap = flatMap(streams, (stream) => 'id=' + stream.game_id)
    const params = '?' + join(paramMap, '&');

    request
      .get(api +'games' + params)
      .set({ 'Client-ID': clientId })
      .accept('json')
      .then(res => {
        forEach(streams, (stream) => {
          stream.game = filter(
            res.body,
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
