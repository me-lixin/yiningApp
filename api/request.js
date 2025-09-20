// utils/request.js
// const BASE_URL = 'http://192.168.0.105:8013/api';
// const BASE_URL = 'http://192.168.133.28:8013/api';
const BASE_URL = 'http://192.168.43.181:8013/api';

export function request({ url, method = 'GET', data = {}, header = {} }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...header,
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          uni.showToast({ title: '请求失败', icon: 'error' });
          reject(res);
        }
      },
      fail(err) {
        uni.showToast({ title: '网络异常', icon: 'error' });
        reject(err);
      }
    });
  });
}
