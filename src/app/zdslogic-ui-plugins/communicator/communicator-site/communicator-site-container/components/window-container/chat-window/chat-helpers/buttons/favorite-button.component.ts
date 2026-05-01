import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap ,  tap } from 'rxjs/operators';

import { ChatMessage } from 'app/zdslogic-ui-base/app/core/models/chat-message.model';
import { ChatMessageService } from 'app/zdslogic-ui-base/app/core/services/chat-message.service';

import { User } from 'app/zdslogic-ui-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-ui-base/core/services/users.service';


@Component({
  selector: 'app-favorite-button',
  styleUrls: ['./favorite-button.component.scss'],
  templateUrl: './favorite-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
  constructor(
    private _chatMessageService: ChatMessageService,
    private _router: Router,
    private _usersService: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() message: ChatMessage;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite(): void {
    this.isSubmitting = true;

    this._usersService.isUserAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this._router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the article if it isn't favorited yet
        if (!this.message.favorited) {
          return this._chatMessageService.favorite(this.message.id)
          .pipe(tap(
            (data) => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfavorite the article
        } else {
          return this._chatMessageService.unfavorite(this.message.id)
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
