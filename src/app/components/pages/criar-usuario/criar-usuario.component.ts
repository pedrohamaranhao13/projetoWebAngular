import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordMatchValidation } from '../../../validations/password-match.validation';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  mensagemSucesso: String = '';
  mensagemErro: string = '';

  constructor(
    private httpClient : HttpClient
  ) {}

  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
    ]),
    senhaConfirmacao: new FormControl('', [
      Validators.required
    ])
  }, {
    validators: [PasswordMatchValidation.MatchPassword]
  });

  get f(): any {
    return this.form.controls;
  }

  onSubmit() : void{

    this.mensagemSucesso = '';
    this.mensagemErro = '';
    
    this.httpClient.post('http://localhost:8082/api/usuario/criar', this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `Parabéns ${data.nome}, seu cadastro foi realizado com sucesso.`;
          this.form.reset();
        },
        error: (e) => {
          this.mensagemErro =  e.error.errors[0];
          console.log(e.error);
        }
      })

  }

}
