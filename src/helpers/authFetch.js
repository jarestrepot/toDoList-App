
export async function startLogin(email, password){
  try {
    const postLoginUser = await fetch('https://server-todo-list-app.cleverapps.io/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (postLoginUser.status > 199 && postLoginUser.status < 399) {
      return await postLoginUser.json();
    }
    return await postLoginUser.json();
  } catch (error) {
    return error;
  }
}

export async function startRegister({ name, lastName, email, password, location = null }){
  try {
    const registerUser = await fetch('https://server-todo-list-app.cleverapps.io/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          name,
          lastName,
          password,
          email,
          location
        }
      )
    });
    if (registerUser.status > 199 && registerUser.status < 399) {
      return true;
    }
    const { Error } = await registerUser.json();
    return Error;
  } catch (Error) {
    return {Error: Error};
  }
}


export async function startDeleteUser(userRef){
  try {
    const deleteUser = await fetch(`https://server-todo-list-app.cleverapps.io/user/delete/${userRef}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 
        'authorization': `Bearer ${window.localStorage.getItem('tokenUser')}`
      }
    });
    if(deleteUser.status === 200){
      return true;
    }
    return await deleteUser.json();
  } catch (error) {
    return { Error: error }
  }
}


export async function startEditUser({ name, lastName, email, password, newPassword, userId, location = null }){
  try {
    const updateUser = await fetch(`https://server-todo-list-app.cleverapps.io/user/modify/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${window.localStorage.getItem('tokenUser')}`
      },
      body: JSON.stringify({
        name,
        lastName,
        password,
        newPassword,
        email,
        location
      })
    });
    return await updateUser.json()
  } catch (error) {
    return { Error: error}
  }
  
}





