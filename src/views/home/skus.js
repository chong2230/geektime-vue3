export function getSkuIds(skus) {
    // TODO: 按分页获取数据
    let arr = skus.slice(0, 10);
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
    // function levelSort(a, b) {
    //     return a.top_level < b.top_level ? 1 : -1;
    // }
    // function newsSort(a, b) {
    //     return a.column_ctime < b.column_ctime ? 1 : -1;
    // }
    // function subSort(a, b) {
    //     return a.sub_count < b.sub_count ? 1 : -1;
    // }
    // function priceSort(a, b) {
    //     if (asc) return a.column_price < b.column_price ? -1 : 1;
    //     else return a.column_price < b.column_price ? 1 : -1;
    // }
    // function spuSort(a, b) {
    //     return a.column_sku < b.column_sku ? 1 : -1;
    // }
    return skuList.sort(sortObj[order]);
}

/*
// all the top_level's value is zero???
export function getLevelSkus(skus) {
    let skuList = [...skus.list];
    function levelSort(a, b) {
        return a.top_level < b.top_level ? 1 : -1;
    }
    return skuList.sort(levelSort);
}

export function getNewsSkus(skus) {
    let skuList = [...skus.list];
    function newsSort(a, b) {
        return a.column_ctime < b.column_ctime ? 1 : -1;
    }
    return skuList.sort(newsSort);;
}

export function getSubSkus(skus) {
    let skuList = [...skus.list];
    function subSort(a, b) {
        return a.sub_count < b.sub_count ? 1 : -1;
    }
    return skuList.sort(subSort);
}

export function getPriceSkus(skus, asc) {
    let skuList = [...skus.list];
    function priceSort(a, b) {
        if (asc) return a.column_price < b.column_price ? -1 : 1;
        else return a.column_price < b.column_price ? 1 : -1;
    }
    return skuList.sort(priceSort);;
}

export function getSpuSkus(skus) {
    let skuList = [...skus.list];
    function spuSort(a, b) {
        return a.column_sku < b.column_sku ? 1 : -1;
    }
    return skuList.sort(spuSort);;
}
*/
