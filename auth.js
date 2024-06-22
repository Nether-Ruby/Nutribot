export const logout = () => {
    localStorage.removeItem('token');
  };
  
  export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Puedes agregar más lógica para verificar la validez del token, como su expiración
    return !!token;
  };