import http from './http'
import Config from '../config/config'

const api = {}

api.getMenuData = params => http.get('/static/time/menu/data.json', params, { baseUrl: Config.staticServer })
api.getExploreAll = params => http.post('/serv/v2/explore/all', params);
api.getAuth = params => http.post('/serv/v1/user/auth', params, { baseUrl: Config.accountServer });
api.getHotWords = params => http.post('/serv/v3/search/hot_words', params);
api.getLectureList = params => http.post('/serv/v3/lecture/list', params);

export default api;