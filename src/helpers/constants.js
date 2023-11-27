

const CONSTANTS = {
  ENDPOINT: 'https://server-todo-list-app.cleverapps.io/user',
  VALIDEMAIL: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
  VALIDPASSWORD: /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/,
  VALIDINPUT: /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{3,}( [a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{3,})?$/,
}
Object.freeze(CONSTANTS);

export default CONSTANTS;