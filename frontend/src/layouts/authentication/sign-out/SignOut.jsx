import { useEffect } from 'react';
export const SignOut = () => {
		// Remove the JWT token from local storage
		localStorage.removeItem('jwt');

		// Redirect to the "/" route
		window.location.reload()
		window.location.href = '/';


	return null;
};
