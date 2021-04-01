export function getSkuIds(skus, page = 1, pageSize = 10) {
    if (!skus) return '';
    let start = (page-1)*pageSize;
    let arr = skus.slice(start, start + pageSize);
    let ids = [];
    for (let item of arr) {
        ids.push(item.column_sku);
    }
    return ids;
}

export function getSkusByOrder(skus, order, asc) {
    let skuList = [...skus.list];
    let sortObj = {
        "1": (a, b) => {
            return a.top_level < b.top_level ? 1 : -1;
        },
        "2": (a, b) => {
            return a.column_ctime < b.column_ctime ? 1 : -1;
        },
        "3": (a, b) => {
            return a.sub_count < b.sub_count ? 1 : -1;
        },
        "4": (a, b) => {
            if (asc) return a.column_price < b.column_price ? -1 : 1;
            else return a.column_price < b.column_price ? 1 : -1;
        },
        "5": (a, b) => {
            return a.column_sku < b.column_sku ? 1 : -1;
        }
    };
    return skuList.sort(sortObj[order]);
}

