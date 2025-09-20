import { request } from '@/api/request.js';

export function getIconAll() {
  return request({
    url: '/icon/all',
    method: 'GET'
  });
}

export function login(user) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: user
  });
}