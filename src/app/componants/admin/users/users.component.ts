import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  usersCount: number;

  usersPerPage = 12;
  pageSizeOptions = [6, 12, 24, 32];
  currentPage = 1;
  private postsSub: Subscription;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getData();
  }

  onChangedPage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.usersPerPage = event.pageSize;
    this.getData();
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onSubmit() {
    this.currentPage = 1;
    this.getData();
  }

  getData() {
    this.postsSub = this.auth
      .getAllUsers(this.usersPerPage, this.currentPage)
      .pipe(
        map((jobsData) => {
          return {
            users: jobsData.users,
            usersCount: jobsData.maxUsers,
          };
        })
      )
      .subscribe((transformedCompaniesData) => {
        this.users = transformedCompaniesData.users;
        this.usersCount = transformedCompaniesData.usersCount;
      });
  }
}
