import { Component, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/catch';
import PerfectScrollbar from 'perfect-scrollbar';

import { IPagination } from './interfaces/pagination.interface'
import { IUser } from './interfaces/user.interface'
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('scrollbarRef') scrollbarRef:ElementRef;

  searchTerm = '';
  users:IPagination = null;
  message:string = '';
  error:string = '';
  ps:PerfectScrollbar;
  isLoading:boolean = true;

  private subs:Subscription[] = [];

  constructor(private us:UsersService) {}

  ngOnInit() {
    this.ps = new PerfectScrollbar(this.scrollbarRef.nativeElement, {
      suppressScrollX: true
    });
    this.searchUsers();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s && s.unsubscribe);

    if (this.ps) {
      this.ps.destroy();
      this.ps = null;
    }
  }

  cleanSearch() {
    this.searchTerm = '';
    this.searchUsers();
  }

  searchUsers(url?:string) {
    this.message = '';
    this.error = '';
    this.isLoading = true;

    this.subs.push(
      this.us.get({searchTerm: this.searchTerm, url}).subscribe((users:IPagination) => {
        this.isLoading = false;
        if (!users) return this.error = 'Empty response from server';

        this.users = users;
        setTimeout(() => this.ps.update());

        if (!this.users.result) return this.message = 'Users not found';

      }, (err) => {
        this.isLoading = false;
        this.users = null;
        this.error = err;
      })
    );
  }

}
