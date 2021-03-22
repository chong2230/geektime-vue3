import http from './http'
import Config from '../config/config'

const api = {}

api.getMenuData = params => http.get('/static/time/menu/data.json', params, { baseUrl: Config.staticServer })
api.getExploreAll = params => http.post('/serv/v2/explore/all', params);
api.getAuth = params => http.post('/serv/v1/user/auth', params, { baseUrl: Config.accountServer });
api.getHotWords = params => http.post('/serv/v3/search/hot_words', params);
api.getLectureList = params => http.post('/serv/v3/lecture/list', params);
api.getIndexLive = params => http.post('/serv/live/get_index_live', params);
api.getProductInfos = params => http.post('/serv/v3/product/infos', params);
api.getLabelSkus = params => http.post('/serv/v1/column/label_skus', params);
api.getPcInterstitial = params => http.get('/static/time/interstitial/pc_interstitial.json', params, { baseUrl: Config.staticServer })

export default api;