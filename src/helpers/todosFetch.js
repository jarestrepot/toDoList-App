export async function startAssetsTodos(){
  try {
    const assetsTodo = await fetch('https://server-todo-list-app.cleverapps.io/user');

    return await assetsTodo.json();

  } catch (error) {
    return { Error: error }
  }
  
}

