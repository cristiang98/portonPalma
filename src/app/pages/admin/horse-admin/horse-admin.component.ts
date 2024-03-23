import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horse-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horse-admin.component.html',
  styleUrl: './horse-admin.component.css'
})
export class HorseAdminComponent implements OnInit, OnDestroy{

  constructor() { }
  private _router = inject(Router);

  ngOnInit(): void {
    console.log('Horse Admin Page');
  }

  ngOnDestroy(): void {
  }

}
