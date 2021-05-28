import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent {
  environment = environment;

  addressForm = this.fb.group({
    nombres: [null, Validators.required],
    email: [null, Validators.required],
    usuario: [null, Validators.required],
    activo: [true],
  });

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) {}

  onSubmit(): void {
    const values = this.addressForm.value;
    if (this.addressForm.valid) {
      this.usuariosService.save(values).subscribe((res) => {
        console.log(res);
        this.addressForm.reset();

        this.addressForm.markAsPristine();
        this.addressForm.markAsUntouched();
        this.addressForm.clearValidators();
      });
    }
  }

  seed() {
    this.usuariosService.seed().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
