export const CONSTANTS = {
  ENDPOINT: 'https://server-todo-list-app.cleverapps.io/user',
  VALIDEMAIL: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
  VALIDPASSWORD: /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/,
  VALIDINPUT: /^.{3,}$/,
  VALIDNUMCHARACTERES: /^.{8,}$/,
  ENDPOINT_LOCAL: 'http://localhost:2023/user'
}
Object.freeze(CONSTANTS);
