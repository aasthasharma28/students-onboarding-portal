import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private router: Router,
    ) { }

    /**
     * Function to execute on logout
     */
    public logout() {
        sessionStorage.removeItem('currentUser'); // Removing the user from session storage
        this.router.navigate(['/login']); // Navigate to login page
    }

}
