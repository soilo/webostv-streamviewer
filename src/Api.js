import request from 'superagent';
import { filter, flatMap, forEach, join, unionBy } from 'lodash-es'

const clientId = '***REMOVED***';
const api = 'https://api.twitch.tv/helix/';
const searchApi = 'https://api.twitch.tv/kraken/search/'

export const fetchStreams = (callback, streams, id, cursor) => {
  callback({ streamIsLoading: true });

  let params = [];
  if (id) {
    params.push('game_id=' + id);
  }
  if (cursor) {
    params.push('after=' + cursor);
  }
  let queryParams = params.length > 0 ? '?' + join(params, '&') : '';

  request
    .get(api + 'streams' + queryParams)
    .set({ 'Client-ID': clientId })
    .accept('json')
    .then(res => callback({
      streamIsLoading: false,
      streams: unionBy(streams, res.body.data, 'id'),
      streamCursor: res.body.pagination.cursor
    }))
    .catch(err => {
      console.log(err);
      callback({ steamHasErrored: true });
    });
}

export const fetchGames = (callback, games, cursor) => {
  callback({ gameIsLoading: true });

  let queryParams = (cursor ? '?after=' + cursor : '');

  request
    .get(api + 'games/top' + queryParams)
    .set({ 'Client-ID': clientId })
    .accept('json')
    .then(res => callback({
      gameIsLoading: false,
      games: unionBy(games, res.body.data, 'id'),
      gameCursor: res.body.pagination.cursor
    }))
    .catch(err => {
      console.log(err);
      callback({ gameHasErrored: true })
    });
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
    const queryParams = '?' + join(paramMap, '&');

    if (enrichables.length > 0) {
      request
        .get(api + 'games' + queryParams)
        .set({ 'Client-ID': clientId })
        .accept('json')
        .then(res => {
          forEach(streams, (stream) => {
            let potentialGame = filter(
              res.body.data,
              (game) => game.id === stream.game_id
            )[0]

            stream.game = potentialGame ?
              potentialGame :
              { id: '-1', name: '', box_art_url: '' }
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

export const searchChannels = (callback, query) => {
  callback({ channelIsLoading: true });

  request
    .get(searchApi + 'channels?query=' + query)
    .set({ 'Client-ID': clientId })
    .accept('application/vnd.twitchtv.v5+json')
    .then(res => callback({
      channelIsLoading: false,
      channels: res.body.channels
    }))
    .catch(err => {
      console.log(err);
      callback({ channelHasErrored: true })
    });
}

export const searchGames = (callback, query) => {
  callback({ gameIsLoading: true });

  request
    .get(searchApi + 'games?query=' + query)
    .set({ 'Client-ID': clientId })
    .accept('application/vnd.twitchtv.v5+json')
    .then(res => callback({
      gameIsLoading: false,
      games: res.body.games
    }))
    .catch(err => {
      console.log(err);
      callback({ gameHasErrored: true })
    });
}
