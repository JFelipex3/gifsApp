import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'vD9zL6cKX1oyL4BkOhuKPG3kcXMyX7w3';
  private _urlApi: string = 'https://api.giphy.com/v1/gifs/search';
  private _historial: string[] = [];

  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {}

  buscarGifts( query: string) {

    if (query.trim().length === 0){
      return;
    }

    query = query.trim().toLowerCase();

    if ( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
    }

    this.http.get(`${this._urlApi}?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe( (resp : any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });

  }
}
