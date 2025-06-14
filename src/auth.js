export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}
export function getUserIdFromToken() {
  const token = getToken();
  if (!token) return null;

  const payload = token.split(".")[1];
  try {
    const decoded = JSON.parse(atob(payload));
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  } catch {
    return null;
  }
}

