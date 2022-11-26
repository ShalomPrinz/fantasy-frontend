const tokenKey = "SessionToken";

const saveIdToken = (idToken: string) =>
  localStorage.setItem(tokenKey, idToken);

const loadIdToken = () => localStorage.getItem(tokenKey);

const removeIdToken = () => localStorage.removeItem(tokenKey);

export { saveIdToken, loadIdToken, removeIdToken };
