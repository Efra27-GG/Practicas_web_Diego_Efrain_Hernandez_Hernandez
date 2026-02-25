import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private API = 'http://127.0.0.1:5000/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get(this.API);
  }

  createGame(game: any): Observable<any> {
    return this.http.post(this.API, game);
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  updateGame(id: string, game: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, game);
  }
}