import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { LastFirstPipe } from '../../pipes/last-first.pipe';
import { VipHighlightDirective } from '../../directives/vip-highlight.directive';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    LastFirstPipe, VipHighlightDirective
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'email', 'company', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private svc: UserService, private router: Router) {}

  ngOnInit(): void {
    // Первая загрузка из внешнего API
    this.svc.load(50).subscribe({
      next: () => {},
      error: () => (this.loading = false)
    });

    // Подписка на поток пользователей
    this.svc.users$.subscribe(list => {
      this.dataSource.data = list;
      this.loading = false;
    });

    // 🔎 Поиск по имени/фамилии/email/компании
    this.dataSource.filterPredicate = (data, filter) => {
      const term = `${data.firstname} ${data.lastname} ${data.email} ${data.company}`.toLowerCase();
      return term.includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  openDetails(row: User): void {
    this.router.navigate(['/users', row.id]);
  }
}
