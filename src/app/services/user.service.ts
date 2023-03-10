import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersEndpoint: string = "http://localhost:5158/users";

  constructor(private http: HttpClient) { }

  getRoles(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await this.http.get(this.usersEndpoint + "/getRoles")
          .subscribe(data => resolve(data));
      } catch (error) {
        reject(error);
      }
    }).catch(err => {
      throw err;
    });
  }

  getUsers(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await this.http.get(this.usersEndpoint + "/index")
          .subscribe(data => resolve(data));
      } catch (error) {
        reject(error);
      }
    }).catch(err => {
      throw err;
    });
  }

  createUser(user: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await this.http.post(this.usersEndpoint + "/create", {
          name: user.nombre,
          firstLastName: user.apellido1,
          secondLastName: user.apellido2,
          email: user.email,
          role: parseInt(user.rol),
          password: user.clave
        }).subscribe(resp => resolve(resp));
      } catch (e) {
        reject(e);
      }
    }).catch(err => {
       throw err;
    });
  }

  deleteUser(id: number): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await this.http.delete(this.usersEndpoint + "/delete/" + id)
          .subscribe(resp => resolve(resp));
      } catch (e) {
        reject(e);
      }
    }).catch(err => {
      throw err;
    });
  }

}
