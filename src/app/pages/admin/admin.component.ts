import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: '../../../assets/css/style.css'
})
export class AdminComponent implements OnInit, OnDestroy{

  private _AdminService = inject(AdminService);
  private _router = inject(Router);
  menuOption: string = '';

  onOption(option: string) {
    this.menuOption = option;
    this._router.navigate([option]);
  }

  ngOnInit(): void {
    this._AdminService.isAdminPage = true;
  }

  ngOnDestroy(): void {
    this._AdminService.isAdminPage = false;
  }

}
