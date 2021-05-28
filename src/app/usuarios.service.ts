import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  api = environment.api;
  newDataSubject = new Subject();
  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<any[]>(`${this.api}/usuarios`);
  }

  save(data: any) {
    return this.http
      .post(`${this.api}/usuarios`, data)
      .pipe(tap(() => this.newDataSubject.next()));
  }

  seed() {
    return this.http
      .get(`${this.api}/usuarios/seed`)
      .pipe(tap(() => this.newDataSubject.next()));
  }

  remove(id: number) {
    return this.http.delete(`${this.api}/usuarios/${id}`);
  }
}
