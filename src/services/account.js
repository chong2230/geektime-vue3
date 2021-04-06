// api按页面划分，避免接口数量太多导致单文件难以维护
import http from '@/common/http.js'
import Config from '@/config/config.js'

const api = {}

api.getCellphoneList = params => http.get('/account/cellphone/list', params, { baseUrl: Config.accountServer })


export default api;