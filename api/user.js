import { request } from '@/api/request.js';

export function register(user) {
  return request({
    url: '/user/register',
    method: 'POST',
    data: user
  });
}

export function login(user) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: user
  });
}