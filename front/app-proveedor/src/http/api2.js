const apiUrl = 'http://localhost:3000';

const requestMethods = { post: 'POST', get: 'GET' };

const endPoints = { login: '/login', registro: '/registro' };

async function fetchb2bApi(path, { body, method }) {
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

export async function login(email, password, confirmPassword) {
  const tokenData = await fetchb2bApi(endPoints.login, {
    method: requestMethods.post,
    body: { email, password, confirmPassword },
  });
  const token = tokenData.data.token;
  localStorage.setItem('token', token);
  return token;
}
export async function signUpApi(name, email, password, confirmPassword) {
  console.log(`nombre ${name}nombre ${email}nombre ${password}nombre ${confirmPassword}`);
  return await fetchb2bApi(endPoints.registro, {
    method: requestMethods.post,
    body: { name, email, password, confirmPassword },
  });
}
