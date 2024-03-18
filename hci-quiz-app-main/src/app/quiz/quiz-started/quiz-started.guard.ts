import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { StatusService } from 'src/app/shared/status.service';

@Injectable({
  providedIn: 'root'
})
export class QuizStartedGuard implements CanActivate {
  constructor(private router: Router, private statusService: StatusService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.statusService.isOnline()) {
      return true;
    } else {
      this.router.navigate(['error']);
      return false;
    }
  }

  canLoad(route: Route): boolean {
    return (this.statusService.isOnline());
  }
}
