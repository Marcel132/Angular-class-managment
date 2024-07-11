import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  private sessionData: any = {}

  set(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string){
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined
  }
  clear(storage: string){
    localStorage.removeItem(storage)
  }
}
