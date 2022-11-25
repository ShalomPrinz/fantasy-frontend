const tokenKey = "SessionToken";

const saveIdToken = (idToken: string) =>
  localStorage.setItem(tokenKey, idToken);

const loadIdToken = () => localStorage.getItem(tokenKey);

export { saveIdToken, loadIdToken };
