import CONSTANTS from "./constants";

export async function startAssetsTodos() {
  try {
    const assetsTodo = await fetch(CONSTANTS.ENDPOINT_LOCAL);

    return await assetsTodo.json();

  } catch (error) {
    return { Error: error }
  }

}

export async function startUpdateTodo({ id, title, description, status, category, importance, userRef }) {
  try {
    const updateTodo = await fetch(`${CONSTANTS.ENDPOINT_LOCAL}/updateTask/${userRef}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${window.localStorage.getItem('tokenUser')}`
      },
      body: JSON.stringify({
        id,
        title,
        description,
        category,
        importance,
        status
      })
    });
    return await updateTodo.json();
  } catch (error) {
    return { Error: error }
  }
}

export async function startNewTodo(todo, userRef) {
  try {
    const reponseJson = await fetch(`${CONSTANTS.ENDPOINT_LOCAL}/newTask/${userRef}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${window.localStorage.getItem('tokenUser')}`,
      },
      body: JSON.stringify(todo)
    })
    return await reponseJson.json();
  } catch (error) {
    return { Error: error }
  }
}


export async function startArchivedTodo(id) {
  try {
    const responseJson = await fetch(`${CONSTANTS.ENDPOINT_LOCAL}/arcivedTask/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${window.localStorage.getItem('tokenUser')}`,
      }
    });
    return await responseJson.json();
  } catch (error) {
    return { Error: error }
  }
}

export async function startDeleteTodo(id) {
  try {
    const responseJson = await fetch(`${CONSTANTS.ENDPOINT_LOCAL}/deleteTask/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${window.localStorage.getItem('tokenUser')}`,
      }
    })
    return await responseJson.json();
  } catch (error) {
    return { Error: error }
  }
}

