import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  data: any[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'nombres',
    'email',
    'createdAt',
    'activo',
    'actions',
  ];

  constructor(
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getUsuarios();
    this.usuariosService.newDataSubject.subscribe(() => this.getUsuarios());
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.data = usuarios;
        console.log(this.data);
      },
    });
  }

  remove(row: any) {
    this.usuariosService.remove(row.id).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res?.affected > 0) {
          this.snackBar.open('Usuario eliminado', '', { duration: 2000 });
          this.data = this.data.filter((el) => el.id !== row.id);
        }
      },
    });
  }
}
