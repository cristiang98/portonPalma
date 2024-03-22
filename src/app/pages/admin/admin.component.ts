import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, OnDestroy{

  private _AdminService = inject(AdminService);

  

  ngOnInit(): void {
    this._AdminService.isAdminPage = true;
  }

  ngOnDestroy(): void {
    this._AdminService.isAdminPage = false;
  }

}
