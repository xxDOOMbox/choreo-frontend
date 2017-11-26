const baseURL = 'http://localhost:3000/api/v1'

// export function login(params) {
//   return fetch(`${baseURL}/login`, {
//       method: 'POST',
//       body: JSON.stringify(params),
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       }
//     }).then(res => res.json()).then(json => console.log(json));
// }

export function saveChoreography(id, choreo) {
  const body = {user_id: id, poses_json: JSON.stringify(choreo)};

  return fetch(`${baseURL}/choreographies`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    // JWT TOKEN / AUTH INFO 
  }).then(res => res.json())
  .then(json => console.log(json)); 
}

export class AuthAdapter {
  static login(loginParams) {
    return fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentUser() {
    return fetch(`${baseURL}/current_user`, {
      headers: headers()
    }).then(res => res.json())
  }
}

function headers() {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  }
}