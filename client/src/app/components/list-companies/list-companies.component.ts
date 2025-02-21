import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompaniesService, Companies } from '../../services/companies.service';
import { compilePipeFromMetadata } from '@angular/compiler';


@Component({
  selector: 'app-list-companies',
  imports: [CommonModule],
  templateUrl: './list-companies.component.html',
  styleUrl: './list-companies.component.css'
})
export class ListCompaniesComponent {
  //Compañias
  companies: Companies[] = [];

  //Asignar colores
  colors: string[] = ["#ff5733", "#33ff57", "#3357ff", "#ff33a6", "#ffa733", "#ffc107", "#ffffff"];
backgroundColors: string[] = [];

  constructor(private companiesService: CompaniesService) {}

  ngOnInit(): void {
    this.getCompanies();

    this.backgroundColors = this.companies.map(() => this.getRandomColor());
  
  }

  //Muestra la lista de compañias
  getCompanies() {
    this.companiesService.getCompanies().subscribe((data:any) => {
      this.companies = data;
    })
  }

  //Asigna un color aleatorio
  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)] || "#ffffff";
  }
}
