const loadIdToken = () => {
  const auth = localStorage.getItem(
    `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
  );
  return auth !== null
    ? JSON.parse(auth).stsTokenManager.accessToken
    : undefined;
};

export { loadIdToken };
