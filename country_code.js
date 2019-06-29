const {go, map ,L,takeAll ,curry ,log,tail} = require("fxjs2");
const axios = require('axios');
const $ = require('cheerio');

const arr_to_obj = (arr) => ({
            name : arr[0],
            code1 : arr[1],
            code2 : arr[2],
            code3 : arr[3]
        });

const c_to_arr = curry(({key1, key2}, cObj) => cObj(key1).find(key2).toArray());

go(
    axios.get("https://ko.wikipedia.org/wiki/ISO_3166-1"),
    ({data}) => data,
    d => $.load(d),
    c_to_arr({key1 : '.wikitable.sortable', key2: 'tr'}),
    L.map(v => $(v).text().trim()),
    L.headTail,
    ([head, tail]) => tail,
    L.map(v => v.split('\n')),
    L.map(arr_to_obj),
    takeAll,
    console.log
)