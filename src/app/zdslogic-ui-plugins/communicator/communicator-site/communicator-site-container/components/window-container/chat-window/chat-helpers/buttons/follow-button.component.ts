import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Profile }  from 'app/zdslogic-ui-base/core/models/profile.model';
import { ProfileEntityService } from 'app/zdslogic-ui-base/core/services/profile-entity.service';
import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowButtonComponent {
  constructor(
    private _profilesService: ProfileEntityService,
    private _router: Router,
    private _usersService: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing(): void {
    this.isSubmitting = true;
    // TODO: remove nested subscribes, use mergeMap

    this._usersService.isUserAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this._router.navigateByUrl('/login');
          return of(null);
        }

        // Follow this profile if we aren't already
        if (!this.profile.following) {
          return this._profilesService.follow(this.profile.userName)
          .pipe(tap(
            (data) => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfollow this profile
        } else {
          return this._profilesService.unfollow(this.profile.userName)
          .pipe(tap(
            (data) => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }
      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }
}
