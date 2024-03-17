import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IHorse } from '../../models/horse/horse.model';
import { ApiHorsesService } from '../../services/horses/api-horses.service';

@Component({
  selector: 'app-horse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horse.component.html',
  styleUrl: './horse.component.css'
})
export class HorseComponent implements OnInit {

  horsesList: IHorse[] = [];

  private _apiHorsesService = inject(ApiHorsesService);

  ngOnInit(): void {
    this._apiHorsesService.getHorses().subscribe((data: IHorse[]) => {
      console.log(data);
      this.horsesList = data;
    }
    );
  }

  horsesList2 = this.horsesList.filter((horse, index, self) =>
  index === self.findIndex((h) => h.breed === horse.breed)
);

}
