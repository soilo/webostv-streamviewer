import request from 'superagent';
import { concat, filter, flatMap, forEach, join } from 'lodash-es'

const clientId = '***REMOVED***';
const api = 'https://api.twitch.tv/helix/';

export const fetchStreams = (callback, streams, id, cursor) => {
  callback({ streamIsLoading: true });

  let queryParams = '';
  if (id) {
    queryParams += 'game_id=' + id;
  }
  if (cursor) {
    if (queryParams.length > 0) {
      queryParams += '&'
    }
    queryParams += 'after=' + cursor;
  }

  request
    .get(api + 'streams')
    .query(queryParams)
    .set({ 'Client-ID': clientId })
    .accept('json')
    .then(res => callback({
      streamIsLoading: false,
      streams: concat(streams, res.body.data),
      streamCursor: res.body.pagination.cursor
    }))
    .catch(err => callback({ steamHasErrored: true }));
}

export const fetchGames = (callback, games, cursor) => {
  callback({ gameIsLoading: true });

  let queryParams = (cursor ? 'after=' + cursor : '');

  request
    .get(api + 'games/top')
    .query(queryParams)
    .set({ 'Client-ID': clientId })
    .accept('json')
    .then(res => callback({
      gameIsLoading: false,
      games: concat(games, res.body.data),
      gameCursor: res.body.pagination.cursor
    }))
    .catch(err => callback({ gameHasErrored: true }));
}

export const fetchGameName = (callback, id) => {
  request
    .get(api + 'games?id=' + id)
    .set({ 'Client-ID': clientId })
    .accept('json')
    .then(res => callback({
      gameName: res.body.data[0].name,
    }));
}

export const enrichStreams = (callback, streams) => {
  if (typeof streams !== 'undefined' &&
      streams.length > 0) {
    const enrichables = filter(streams, (stream) => !stream.game);
    const paramMap = flatMap(enrichables, (stream) => 'id=' + stream.game_id);
    const queryParams = join(paramMap, '&');

    if (enrichables.length > 0) {
      request
        .get(api + 'games')
        .query(queryParams)
        .set({ 'Client-ID': clientId })
        .accept('json')
        .then(res => {
          forEach(streams, (stream) => {
            let potentialGame = filter(
              res.body.data,
              (game) => game.id === stream.game_id
            )[0]

            stream.game = potentialGame ? potentialGame : {id: '-1', name: '', box_art_url: ''}
          })
          callback({ streams: streams })
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('abort')
          }
        });
    }
  }
}
