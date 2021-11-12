import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable }    from 'rxjs';
import { BancService } from '../../services/banc.service'

@Component({
  selector: 'app-nuevo-destinatario',
  templateUrl: './nuevo-destinatario.component.html',
  styleUrls: ['./nuevo-destinatario.component.scss']
})
export class NuevoDestinatarioComponent implements OnInit {

  public formGroup!: FormGroup;
  titleAlert: string = 'Este campo es requerido';
  post = '';
  bancs: any;

  constructor(private formBuilder: FormBuilder,
              private bancService: BancService) { }

  ngOnInit(): void {
    this.createForm();
    this.setChangeValidate();
    this.getBancs();

  }

  getBancs(): void {
    this.bancService.showBancs().subscribe(bancs => {
      this.bancs = bancs;
      console.log(this.bancs);
    });

  }

  createForm() {

    //expresion regular para validar el formato de correo
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //agrupador del formulario y sus respectivas validaciones
    this.formGroup = this.formBuilder.group({
      'rut': [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      'name': [null, [Validators.required,Validators.minLength(5), Validators.maxLength(10)]],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'phone': [null, [Validators.required,Validators.minLength(9)]],
      'banc': [null, [Validators.required]],
      'typeAcount': [null,[Validators.required]],
      'numberAcount': [null, [Validators.required]],
      'validate': ''

    });
  }

  setChangeValidate() {
    this.formGroup.get('validate')!.valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name')!.setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "Se necesita un minimo de 3 caracteres.";
        } else {
          this.formGroup.get('name')!.setValidators(Validators.required);
        }
        this.formGroup.get('name')!.updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  getErrorEmail() {
    return this.formGroup.get('email')!.hasError('required') ? 'Este campo es requerido' :
      this.formGroup.get('email')!.hasError('pattern') ? 'El email no es valido' :
        this.formGroup.get('email')!.hasError('alreadyInUse') ? 'Este email ya esta en uso' : '';
  }
  onSubmit(post:any) {
    this.post = post;
    console.log(this.post);
    this.bancService.createDestinatario(this.post).subscribe(res => {

        console.log('res post crear destinatario', res);
    });
  }


}
