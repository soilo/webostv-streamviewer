import request from 'superagent';
import { join, filter, flatMap, forEach} from 'lodash-es'

const clientId = '***REMOVED***';
const api = 'https://api.twitch.tv/helix/';

export const fetchStreams = (callback) => {
  callback({ isLoading: true });
  request
    .get(api + 'streams')
    .set({
      'Client-ID': clientId
    })
    .accept('json')
    .then(res => callback({
      isLoading: false,
      streams: res.body.data,
      pagination: res.body.pagination
    }))
    .catch(err => callback({ hasErrored: true }));
}

export const enrichStreams = (streams, callback) => {
  if (typeof streams !== 'undefined' &&
      streams.length > 0 &&
      typeof streams[0].game === 'undefined') {
    const paramMap = flatMap(streams, (stream) => 'id=' + stream.game_id)
    const params = '?' + join(paramMap, '&');
    request
      .get(api +'games' + params)
      .set({
        'Client-ID': clientId
      })
      .accept('json')
      .then(res => {
        forEach(streams, (stream) => {
          stream.game = filter(res.body.data, (game) => game.id === stream.game_id)[0]
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