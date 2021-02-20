const apiUrl = 'http://localhost:3000';

const requestMethods = { post: 'POST', get: 'GET', put: 'PUT' };

const endPoints = {
  login: '/login',
  registro: '/registro',
  recoverPass: '/login/recover-pass',
  resetPass: '/login/modify-pass',
};
async function fetchFormData(path, { body, method }) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  const headers = new Headers();
  headers.append('Authorization', token);

  return await fetch(`${apiUrl}${path}`, { method, headers, body });
}

async function fetchb2bApi(path, { body, method }) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
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
export async function updateInfo(data, id) {
  const body = new FormData();
  body.append('name', data.nombre);
  body.append('email', data.email);
  body.append('bio', data.bio);
  body.append('photo', data.foto[0]);
  return await fetchFormData(`/profile/${id}/info`, {
    method: requestMethods.put,
    body,
  });
}
export async function login(email, password, confirmPassword) {
  const tokenData = await fetchb2bApi(endPoints.login, {
    method: requestMethods.post,
    body: { email, password, confirmPassword },
  });
  const token = tokenData.data.token;
  localStorage.setItem('token', token);
  return token;
}
export async function recover(email) {
  return await fetchb2bApi(endPoints.recoverPass, {
    method: requestMethods.post,
    body: { email },
  });
}
export async function getUserInfo(id) {
  const userDat = await fetchb2bApi(`/profile/${id}/info`, {
    method: requestMethods.get,
  });
  return userDat;
}
export async function resetPass(recoverCode, newPassword, confirmPass) {
  console.log(recoverCode, newPassword, confirmPass);
  return await fetchb2bApi(endPoints.resetPass, {
    method: requestMethods.post,
    body: {
      recoverCode,
      newPassword,
      confirmPass,
    },
  });
}
export async function signUpApi(name, email, password, confirmPassword) {
  return await fetchb2bApi(endPoints.registro, {
    method: requestMethods.post,
    body: { name, email, password, confirmPassword },
  });
}
