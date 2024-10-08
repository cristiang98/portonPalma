import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isAdminPage:boolean = false;

  constructor() { }
}
