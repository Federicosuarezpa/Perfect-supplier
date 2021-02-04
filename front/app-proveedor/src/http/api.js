const apiUrl = 'https://api2.bootcamp.hackaboss.com';

const requestMethods = { post: 'POST', get: 'GET' };
const endpoints = { login: '/users/login', signUp: '/users', getUserInfo: '/users/', entries: '/entries' };

async function fetchFormData(path, { body, method }) {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  headers.append('Authorization', token);

  return await fetch(`${apiUrl}${path}`, { method, headers, body });
}

async function fetchTravelApi(path, { body, method }) {
  const token = localStorage.getItem('token');
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (token) {
    headers.append('Authorization', token);
  }
  const request = await fetch(`${apiUrl}${path}`, { headers: headers, method: method, body: JSON.stringify(body) });
  const requestData = await request.json();
  if (requestData.status === 'error') {
    throw requestData.message;
  }
  return requestData;
}

export async function login(email, password) {
  const tokenData = await fetchTravelApi(endpoints.login, { method: requestMethods.post, body: { email, password } });
  const token = tokenData.data.token;
  localStorage.setItem('token', token);
  return token;
}

export async function signUpApi(email, password) {
  return await fetchTravelApi(endpoints.signUp, {
    method: requestMethods.post,
    body: { email, password, invite: 'moduloreact' },
  });
}

export async function getUserInfo(userId) {
  const userData = await fetchTravelApi(`${endpoints.getUserInfo}${userId}`, { method: requestMethods.get });
  return userData.data;
}

export async function newEntry(data) {
  const body = new FormData();
  body.append('place', data.place);
  body.append('description', data.description);
  body.append('foto1', data.foto1[0]);

  return await fetchFormData(endpoints.entries, { method: requestMethods.post, body });
}
