import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user-related';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  updateHasPet(id: string): Observable<User> {
    return this.http.put<User>('/api/update-has-pet', { id });
  }
}
