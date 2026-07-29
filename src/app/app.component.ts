import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarContrasenasIguales } from './validadores-personalizados';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  formularioRegistro!: FormGroup;
  datosResumen: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioRegistro = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      nombreUsuario: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]+$')]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(15), Validators.max(90)]],
      terminos: [false, [Validators.requiredTrue]]
    }, {
      validators: validarContrasenasIguales('contrasena', 'confirmarContrasena')
    });
  }

  alEnviar(): void {
    if (this.formularioRegistro.valid) {
      const { contrasena, confirmarContrasena, ...restoDatos } = this.formularioRegistro.value;
      this.datosResumen = restoDatos;
      this.formularioRegistro.reset();
    }
  }
}