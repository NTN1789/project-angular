import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  consultarCEP(cep: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cep}/json/`);
  }
}
