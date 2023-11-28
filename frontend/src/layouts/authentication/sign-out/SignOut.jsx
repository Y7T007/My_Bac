import { useEffect } from 'react';
export const SignOut = () => {
		// Remove the JWT token from local storage
		localStorage.removeItem('jwt');
		localStorage.removeItem('userInfos');

		// Redirect to the "/" route
		window.location.reload()
		window.location.href = '/';


	return null;
};
