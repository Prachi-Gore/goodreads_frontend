//  const ANY_ACCESS = [
// 'signup',
// 'book-list', 
// 'signin',
// 'forgot-password'
// ]; // No need of login

 const AUTH_ACCESS=[
'reset-password',
'book',
'shelf'
]; // login required

export const BASE_URL= import.meta.env.VITE_API_URL;

export default AUTH_ACCESS;