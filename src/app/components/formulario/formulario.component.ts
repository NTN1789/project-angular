import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from '../../services/cep.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private cepService: CepService) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
    });
  }

  buscarCEP(): void {
    const controleCep = this.formulario.get('cep');

    if (controleCep) {
      let cep = controleCep.value;

      cep = cep.replace('-', '');

      if (cep.length === 8) {
        this.cepService.consultarCEP(cep).subscribe({
          next: (dados) => {
            if (!dados.erro) {
              this.formulario.patchValue({
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                localidade: dados.localidade,
                uf: dados.uf,
              });
            } else {
              alert('CEP não encontrado!');
            }
          },
          error: () => {
            alert('Erro ao consultar o CEP.');
          },
        });
      } else {
        alert('CEP inválido! Certifique-se de que está no formato correto.');
      }
    }
  }

  aplicarMascaraCep(): void {
    const controleCep = this.formulario.get('cep');

    if (controleCep) {
      let cep = controleCep.value;

      cep = cep.replace(/\D/g, '');

      if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
      }

      controleCep.setValue(cep, { emitEvent: false });
    }
  }
}
