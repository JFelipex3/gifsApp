import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'vD9zL6cKX1oyL4BkOhuKPG3kcXMyX7w3';
  private _servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {
    
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifts( query: string) {

    if (query.trim().length === 0){
      return;
    }

    query = query.trim().toLowerCase();

    if ( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGIFResponse>(`${this._servicioURL}/search`, {params : params})
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(resp.data));
      });

  }
}
