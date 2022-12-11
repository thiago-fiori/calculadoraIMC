import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number = 0
  height: number = 0
  imc: number = 0
  classificacao: string = ""
  grau_obesidade: number = 0

  constructor(private toastCtrl: ToastController) {}

  onCalculate() {
    if (this.height <= 0 || this.weight <= 0) {
      return
    }
    
    this.imc = this.weight / (this.height * this.height)

    if (this.imc < 18.5){
      this.classificacao = "MAGREZA"
      this.grau_obesidade = 0
    } else if (this.imc >= 18.5 && this.imc <= 24.9){
      this.classificacao = "NORMAL"
      this.grau_obesidade = 0
    } else if (this.imc >= 25 && this.imc <= 29.9){
      this.classificacao = "SOBREPESO"
      this.grau_obesidade = 1
    } else if (this.imc >= 30 && this.imc <= 39.9){
      this.classificacao = "OBESIDADE"
      this.grau_obesidade = 2
    } else if (this.imc >= 40){
      this.classificacao = "OBESIDADE GRAVE"
      this.grau_obesidade = 3
    }

    this.showIMC()
  }

  async showIMC() {
    let toast = await this.toastCtrl.create({
      message: `IMC = ${this.imc.toFixed(2)}` + `<br/>Classificação = ${this.classificacao}` + `<br/> Grau de Obesidade = ${this.grau_obesidade.toString()}`,
      duration: 3000,
      color: 'secondary'
    })

    toast.present()

  }


}
