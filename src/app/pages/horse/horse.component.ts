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

  originalHorsesList: IHorse[] = [];
  horsesList: IHorse[] = [];
  horsesList2: IHorse[] = [];
  selectedBreed: string = 'Filtrar por Raza';

  private _apiHorsesService = inject(ApiHorsesService);

  ngOnInit(): void {
    this._apiHorsesService.getHorses().subscribe((data: IHorse[]) => {
      this.originalHorsesList = data;
      this.horsesList = [...this.originalHorsesList];
      this.horsesList2 = this.filterHorses(this.originalHorsesList);
    });
  }

  filterHorses(horsesList: IHorse[]) {
    return horsesList.filter((horse, index, self) =>
      index === self.findIndex((h) => h.breed === horse.breed)
    );
  }

  filterByBreed(breed: string) {
    this.horsesList = this.originalHorsesList.filter(horse => horse.breed === breed);
    this.selectedBreed = breed;
  }

  lista() {
    this.horsesList = [...this.originalHorsesList];
  }

}
