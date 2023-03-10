import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  displayedColumns: string[] = ["id","nombre","apellidos","email","rol","acciones"];
  users: any[] = [];
  isLoaded: boolean = false;
  message?: string;

  constructor(private userSvc: UserService, public dialog: MatDialog){ }

  async ngOnInit(): Promise<any> {
    await this.userSvc.getUsers().then(data => {
      data.forEach(async (e: any) => {
        this.users.push({
          id: e.id,
          nombre: e.name,
          apellidos: e.firstLastName.concat(" ").concat(e.secondLastName!=null ? e.secondLastName : ""),
          email: e.email,
          rol: e.role
        });
      });
    }).catch(err => console.log(err)).then(() => {
      this.isLoaded = true;
      console.log("Componente renderizado");
    });
  }

  deleteModal(id: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      height: '150px',
      data: id
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userSvc.deleteUser(id)
          .then(resp => {
            console.log("Eliminado con éxito", resp);
            this.message = "Usuario " + id + " eliminado exitosamente";
            setTimeout(() => window.location.reload(), 2500);
          })
          .catch(err => {
            throw err;
          });
      }
    });
  }

}