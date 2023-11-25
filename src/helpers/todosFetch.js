import CONSTANTS from "./constants";

export async function startAssetsTodos(){
  try {
    const assetsTodo = await fetch(CONSTANTS.ENDPOINT);

    return await assetsTodo.json();

  } catch (error) {
    return { Error: error }
  }
  
}

export async function startUpdateTodo({id, title, description, status, category, importance, userRef }){
  try {
    const updateTodo = await fetch(`${CONSTANTS.ENDPOINT}/updateTask/${userRef}`, {
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
    const response = await updateTodo.json();
    console.log(response)
  } catch (error) {
    console.error(error);
  }
}

