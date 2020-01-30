import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './../shared/models/producto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService {

  constructor(protected http: HttpClient) { super(http); }

  public crearProducto(producto: Producto) {
    return this.doPost<Producto, any>(`/productos`, producto);
  }

  public consultaProducto(codigo: string) {
    return this.doGet<Producto>(`/productos/${codigo}`);
  }

  public listarProductos() {
    return this.doGet<Producto[]>(`/productos`);
  }

}
