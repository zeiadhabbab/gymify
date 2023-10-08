import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
    constructor(private authService: NbAuthService, private router: Router) {};

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated().pipe(
            tap(authenticated => {
                if (!authenticated) {
                    this.router.navigate(['auth/login']);
                }
            }),
        );
    }
}