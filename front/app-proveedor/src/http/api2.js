const apiUrl = 'http://localhost:3000';

const requestMethods = { post: 'POST', get: 'GET', put: 'PUT', delete: 'DELETE' };

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
export async function getProducts() {
  const info = await fetchb2bApi(`/all`, {
    method: requestMethods.get,
  });
  return info;
}
export async function getProductInfo(id) {
  const data = await fetchb2bApi(`/all/${id}`, {
    method: requestMethods.get,
  });
  return data;
}
export async function modifyProduct(id, id_product, data) {
  const body = new FormData();
  body.append('name', data.nombre);
  body.append('location', data.city);
  body.append('description', data.bio);
  body.append('price', data.price);
  body.append('category', data.category);
  body.append('photo', data.foto[0]);
  const message = await fetchFormData(`/profile/${id}/all/${id_product}`, {
    method: requestMethods.put,
    body,
  });
  return message;
}
export async function deleteProduct(id, id_product) {
  const path = `/profile/${id}/all/${id_product}`;
  await fetchb2bApi(path, {
    method: requestMethods.delete,
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
export async function validateUser(codigo) {
  const message = await fetchb2bApi(`/user/validate/${codigo}`, {
    method: requestMethods.get,
  });
  return message;
}
export async function newProduct(data, id) {
  const body = new FormData();
  body.append('location', data.location);
  body.append('description', data.description);
  body.append('price', data.price);
  body.append('name', data.name);
  body.append('category', data.category);
  body.append('photo', data.foto[0]);
  return await fetchFormData(`/profile/${id}/newProduct`, {
    method: requestMethods.post,
    body,
  });
}
export async function getProductsPosted(id) {
  const userDat = await fetchb2bApi(`/profile/${id}/products`, {
    method: requestMethods.get,
  });
  return userDat;
}
export async function resetPass(recoverCode, newPassword, confirmPass) {
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
export async function buyProduct(id, price, id_product) {
  return await fetchb2bApi(`/user/${id}/all/${id_product}/book`, {
    method: requestMethods.post,
    body: {
      price,
    },
  });
}
export async function productsBought(id) {
  return await fetchb2bApi(`/profile/${id}/deals`, {
    method: requestMethods.get,
  });
}
export async function getRated(id_deal) {
  return await fetchb2bApi(`/product/rate/${id_deal}`, {
    method: requestMethods.get,
  });
}
export async function voteProduct(id, id_deal, puntuation, review) {
  console.log(puntuation, review);
  return await fetchb2bApi(`/profile/${id}/product/${id_deal}/rate/value`, {
    method: requestMethods.post,
    body: {
      puntuation,
      review,
    },
  });
}
export async function getReviewValue(id_product) {
  const value = await fetchb2bApi(`/product/${id_product}/rating`, {
    method: requestMethods.get,
  });
  console.log(value);
  return value;
}
