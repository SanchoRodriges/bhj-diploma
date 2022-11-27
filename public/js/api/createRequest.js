/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest;
    const formData = new FormData;
    
    let url;
    let {method, data, callback} = options;
    
    if (method === 'GET') {

        let urlArr = [];
        for (let key in data) {
            urlArr.push(key + '=' + data[key]);
        }
        url = options.url + '?' + urlArr.join('&');

    } else {

        url = options.url;
        for (let key in data) {
            formData.append( key, data[key] );
        }

    }

    xhr.open( method, url );
    xhr.responseType = 'json';
    xhr.send( formData );

    xhr.onload = () => {
        callback('', xhr.response);
    }

    xhr.onerror  = () => {
        callback(xhr.response, '');
    }

};
