import { Component, OnInit } from '@angular/core';

import { ProductoService } from './../../service/producto.service';
import { Producto } from './../../shared/models/producto';
import { FormGroup, FormBuilder } from '@angular/forms';

declare var $: any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

declare interface TableDataProduto {
  headerRow: string[];
  dataRows: Producto[];
}
declare interface TableWithCheckboxes {
  id?: number;
  ischecked?: boolean;
  product_name: string;
  type: string;
  quantity: number;
  price: any;
  amount: string;
}
export interface TableData2 {
  headerRow: string[];
  dataRows: TableWithCheckboxes[];
}

@Component({
  selector: 'app-extended-table-cmp',
  templateUrl: 'extendedtable.component.html'
})
export class ExtendedTableComponent implements OnInit {

  public tableData1: TableDataProduto;
  public tableData2: TableData2;
  public tableData3: TableData;
  public adicionar: boolean;
  public crear: boolean;
  public productos: Producto[];
  public productoAdicionar: Producto;

  producto2: {
      codigo: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private servicioProducto: ProductoService
  ) {}

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['Código', 'Nombre', 'Cantidad', 'Precio', 'Actions'],
      dataRows: this.productos
    };
    this.tableData2 = {
      headerRow: ['#', '', 'Product Name', 'Type', 'Qty', 'Price', 'Amount'],
      dataRows: [
        {
          id: 1,
          ischecked: true,
          product_name: 'Moleskine Agenda',
          type: 'Office',
          quantity: 25,
          price: 49,
          amount: '1,225'
        },
        {
          id: 2,
          ischecked: true,
          product_name: 'Stabilo Pen',
          type: 'Office',
          quantity: 30,
          price: 10.99,
          amount: '109'
        },
        {
          id: 3,
          ischecked: true,
          product_name: 'A4 Paper Pack',
          type: 'Office',
          quantity: 50,
          price: 49,
          amount: '1,225'
        },
        {
          id: 4,
          ischecked: false,
          product_name: 'Apple iPad',
          type: 'Meeting',
          quantity: 10,
          price: 499.0,
          amount: '4,990'
        },
        {
          id: 5,
          ischecked: false,
          product_name: 'Apple iPhone',
          type: 'Communication',
          quantity: 10,
          price: 599.0,
          amount: '5,999'
        }
      ]
    };
    this.tableData3 = {
      headerRow: ['', 'PRODUCT', 'COLOR', 'SIZE', 'PRICE', 'QTY', 'AMOUNT'],
      dataRows: [
        [
          'product1',
          '#jacket',
          'Spring Jacket',
          'by Dolce&Gabbana',
          'Red',
          'M',
          '549',
          '1',
          '549'
        ],
        [
          'product2',
          '#pants',
          'Short Pants',
          'by Pucci',
          'Purple',
          'M',
          '499',
          '2',
          '998'
        ],
        [
          'product3',
          '#nothing',
          'Pencil Skirt',
          'by Valentino',
          'White',
          'XL',
          '799',
          '1',
          '799'
        ]
      ]
    };

    this.listarProductos();
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.tableData3.dataRows.length; i++) {
      const integer = parseInt(this.tableData3.dataRows[i][8], 10);
      total += integer;
    }
    return total;
  }

  adicionarProducto(producto) {
    this.adicionar = true;
    this.crear = false;
    this.servicioProducto.consultaProducto(producto.codigo).subscribe(resp => {
      this.productoAdicionar = resp;
      this.codigo = this.productoAdicionar.codigo;
    });
  }

  crearProducto() {
    this.crear = true;
    this.adicionar = false;
  }

  listarProductos() {
    this.servicioProducto.listarProductos().subscribe(resp => {
      this.productos = resp;
    });
  } 
}
