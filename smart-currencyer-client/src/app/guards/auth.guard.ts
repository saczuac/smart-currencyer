import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './../services/login.service';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private loginService: LoginService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.loginService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}