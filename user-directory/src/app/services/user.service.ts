import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Подгрузить пользователей с fakerapi.it */
  load(quantity = 40) {
    const url = `https://fakerapi.it/api/v1/users?_quantity=${quantity}&_locale=en_US`;
    return this.http.get<any>(url).pipe(
      map(res => (res.data || []).map((u: any, i: number) => ({
        id: cryptoRandomId(),
        firstname: u.firstname || 'John',
        lastname:  u.lastname  || 'Doe',
        email:     u.email     || 'unknown@example.com',
        company:   (u.company && (u.company.name || u.company)) || '—',
        isVip: i % 7 === 0 // простое правило для демонстрации директивы
      }) as User)),
      tap(list => this.usersSubject.next(list))
    );
  }

  add(newUser: Omit<User, 'id'>) {
    const u: User = { ...newUser, id: cryptoRandomId(), isVip: !!newUser.isVip };
    this.usersSubject.next([u, ...this.usersSubject.value]);
  }

  getById(id: string) {
    return this.usersSubject.value.find(u => u.id === id) ?? null;
  }
}

/** Лёгкий генератор id */
function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
