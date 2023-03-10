import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  @Input() flexCenter?: boolean;
  mainDocument: any;

  constructor(){ }

  ngAfterViewInit(): void {
    this.mainDocument = document.getElementById("main");
    if (this.flexCenter) {
      this.mainDocument.style.justifyContent = "center";
      this.mainDocument.style.alignItems = "center";
    }
  }

  sources: any[] = [
    { label: "Lista de Usuarios", path: "usuarios" },
    { label: "Registrar Usuarios", path: "usuarios/crear" },
    { label: "Salir", path: "usuarios" }
  ];

}
