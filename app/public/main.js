const manageResponse = ({ message, token, redirect }) => {
  if(token){
    window.localStorage.setItem('user-token', token)
  }
  window.location.href = redirect
}

const sendNewUser = (username, password, endpoint, method) => {
  const user = {
    username: username,
    password: password
  }
  if(username && password) {
    fetch(`http://localhost:5000/api/${endpoint}`, {
      method: method,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if(!data.success) {
        console.log(data.message)
        alert(`Something wrong when ${endpoint}`)
        return
      }
      manageResponse(data)
    })
  }
}

const confirmPassword = (password) => {
  return password === document.getElementsByName('cpsw')[0].value
}

const getDataFromForm = type => {
  const userName = document.getElementsByName('uname')[0].value
  const password = document.getElementsByName('psw')[0].value
  if(type === 'signup') {
    if (!confirmPassword(password)) {
      alert('Your password doesnt match')
      return
    }
  }
  console.log(sendNewUser(userName, password, type, 'post'))
}

const signUpAction = () => {
  document.getElementById('signup').addEventListener('click', () => getDataFromForm('signup'))
}
const loginAction = () => {
  document.getElementById('login').addEventListener('click', () => getDataFromForm('login'))
}


window.onload = () => {
  if(document.getElementById('signup')) signUpAction()
  if(document.getElementById('login')) loginAction()
}