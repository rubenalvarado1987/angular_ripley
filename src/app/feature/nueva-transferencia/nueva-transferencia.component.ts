import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { BancService } from 'src/app/services/banc.service';
import { map, startWith } from 'rxjs/operators';

export class Destinatario {
  constructor(public firstname: string, public lastname: string, public selected?: boolean) {
    if (selected === undefined) selected = false;
  }
}

@Component({
  selector: 'app-nueva-transferencia',
  templateUrl: './nueva-transferencia.component.html',
  styleUrls: ['./nueva-transferencia.component.scss']
})
export class NuevaTransferenciaComponent implements OnInit {

  public formGroup!: FormGroup;
  titleAlert: string = 'Este campo es requerido';
  post = '';
  destinatarios: any;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<String[]> | undefined;


  constructor(private bancService: BancService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.getDestinatarios();

    this.filteredOptions = this.formGroup.get('destinatario')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  getDestinatarios() {
    this.bancService.getDestinatarios().subscribe(resp => {
      console.log("Listado de destinatarios:", resp);
      this.destinatarios = resp;
      this.destinatarios = this.destinatarios.destinatarios;
      this.destinatarios.forEach((element: any) => {
        this.options.push(element.name);
      });

    });
  }

  createForm() {

    //agrupador del formulario y sus respectivas validaciones
    this.formGroup = this.formBuilder.group({
      'destinatario': [null, [forbiddenNamesValidator(this.options)]],
      'monto': [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      'validate': ''
    });
  }

  onSubmit(post: any) {
    this.post = post;
    console.log(this.post);
    this.bancService.createTransferencia(this.post).subscribe(res => {
      console.log('res post crear transferencia', res);
    });
  }


}

export function forbiddenNamesValidator(Destinatarios: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    console.log("matriz de busqueda:",Destinatarios);

    const index = Destinatarios.findIndex(Destinatario => {

      console.log(Destinatario, ' - ', control.value);

      return (new RegExp('\^' + Destinatario + '\$')).test(control.value);
    });
    console.log(index);
    return index < 0 ? { 'forbiddenNames': { value: control.value } } : null;
  };
}
