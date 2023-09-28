// component.ts
import { Component, OnInit } from '@angular/core';
import { DataCinetPay } from '../../models/cinetpay.model';
import { MasseRequest } from '../../models/masse.model';
import * as intlTelInput from 'intl-tel-input';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { CoreService } from 'src/app/core/services/core.service';
import { MesseService } from '../../services/messe.service';
import { GlobalService } from 'src/app/global/services/global.service';
import { RandomText } from 'src/app/global/models/random.model';
import { DataCountry } from 'src/app/global/models/country.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-messe-quotidienne',
  templateUrl: './messe-quotidienne.component.html',
  styleUrls: ['./messe-quotidienne.component.css']
})

export class MesseQuotidienneComponent implements OnInit{
  //Current step of the form 
  currentStep = 1;
  template!:string;
  defunt=1;



  defunt1!:string;
  defunt2!:string;
  defunt3!:string;

  //Add defunt boolean
  onAddDefunt = false;

  //Choose boolan for template
  isChosen = false;
  isTemplate:number = 0;
  isTemplateChosen= false;
  isTemplate2Chosen = false;
  isTemplateDisabled= true;

  eventName!: string;
  personName!:string;
  personName2!:string;

  // ~~~ Random string for transaction id ~~ //
  dataRandom!:RandomText;

  //~~~~~ intention type input ~~~~~~~~//
  intentionType!:HTMLInputElement;


  // ~~~~~~~~~~~Default intention~~~~~~~~~~~~ //
  defaultIntention = 'defaultIntention';

  // ~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~ //
  dataCinetPay!:DataCinetPay;
  formData!: MasseRequest;
  countries!: DataCountry;

  // ~~~~~~~~~~~~~~ Tel input ~~~~~~~~~~~~~~ //
  inputTel!: HTMLInputElement;
  iti!: intlTelInput.Plugin;

  //Fake other type data
  // otherTypeData = [
  //   {
  //     request_id: 1,
  //     template1: "(nom_du_demandeur) rend grâce au seigneur pour tous ses bienfaits",
  //     template2: "(nom_du_demandeur) rend grâce au seigneur à l’occasion (Nom_evenement)",
  //     requestLibelle: "Action de grace",
  //   },
  //   {request_id: 2,
  //     template1: "(nom_du_demandeur) demande aide, assistance, protection du seigneur pour (Nom_de_la personne)",
  //     template2: "(nom_du_demandeur) demande guérison, délivrance, libération du seigneur pour(Nom_de_la personne)",
  //     requestLibelle: "Autres demandes",
  //   },
  //   {request_id: 3,
  //     template1: "Repos éternel (nom_du_défunt) demandé par (nom_du_demandeur)",
  //     template2: "Un tel prie pour le repos éternel de (nom_du_défunt ou nom_des_défunts (3 noms au maximum))",
  //     requestLibelle: "Défunts",
  //   }
  // ]

  otherTypeData = [
    {request_id: 1,
      template1: "(nom_du_demandeur) demande aide, assistance, protection du seigneur pour (Nom_de_la personne)",
      template2: "(nom_du_demandeur) demande guérison, délivrance, libération du seigneur pour(Nom_de_la personne)",
      requestLibelle: "Autres demandes",
    },
    {
      request_id: 2,
      template1: "(nom_du_demandeur) rend grâce au seigneur pour tous ses bienfaits",
      template2: "(nom_du_demandeur) rend grâce au seigneur à l’occasion (Nom_evenement)",
      requestLibelle: "Action de grace",
    },
    {request_id: 3,
      template1: "Repos éternel (nom_du_défunt) demandé par (nom_du_demandeur)",
      template2: "Un tel prie pour le repos éternel de (nom_du_défunt ou nom_des_défunts (3 noms au maximum))",
      requestLibelle: "Défunts",
    }
  ]




  constructor(
    private route:ActivatedRoute, 
    private coreService: CoreService,
    private messeService: MesseService,
    private globalService: GlobalService 
  ) {
    
  } 

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    

    this.route.data.pipe(
      map(data => data['country'])).subscribe(
      data => this.countries = data
    );

    //Initialized form data
    this.formData = {
      lastNameMr: "",
      firstNameMr: "",
      contactMr: "",
      transaction_id: "aucun", //pas necessaire
      isAnonymous: false,
      startDateMr: "",
      payeurRequestmesse: "aucun",//pas necessaire
      masses_id: 24,//id de la messe selectionner par l'utilisateur
      masses_types_id: 1,//1 quotidienne 2 pour neuvieme 3 trentaine
      request_type: 0,// 1 action de grace, 2 autres, 3 repos eternelle
      templateEr: "",
      defunt1: "",
      defunt2: "",
      defunt3: ""
    }

     // ~~~~~~~~~~~~~~ Tel Input ~~~~~~~~~~~~~~ //
     this.inputTel = document.querySelector('input[type="tel"]') as HTMLInputElement;
     if (this.inputTel) {
       this.iti = intlTelInput(this.inputTel, {
         initialCountry: 'CI',
         separateDialCode: true,
         utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.5/js/utils.js'
       });
     }
  }

   //Go to edit demand time
   goToEditDemandTime(){
    this.coreService.goToEditDemandTime()
   } 
  // ~~~~~ Check if is anonymous ~~~~~~~~~//
  checkAnonymous(){
    if(this.formData.isAnonymous){
      this.formData.lastNameMr = "anonymous";
      this.formData.firstNameMr = "anonymous";
      return true
    }else{
      return false
    }
  }

  captureTemplate(intentionText: string): Boolean{
    if(this.isTemplateChosen==false){
      this.isTemplateChosen = true;
      this.isTemplate2Chosen = false;
      this.formData.templateEr = intentionText;
      console.log('intentionText', intentionText);
      return this.isTemplateChosen
    }else if(this.isTemplateChosen==true){
      this.isTemplateChosen = false;
      this.isTemplate2Chosen = true;
      this.formData.templateEr = intentionText;
      console.log('intentionText', intentionText);
      return this.isTemplateChosen
    }
    
    return this.isTemplateChosen
  }

  captureTemplate1(intentionText: string): Boolean{
    if(this.isTemplate2Chosen==false){
      this.isTemplate2Chosen = true;
      this.isTemplateChosen = false;
      this.formData.templateEr = intentionText;
      console.log('intentionText', intentionText);
      return this.isTemplate2Chosen
    }else if(this.isTemplate2Chosen==true){
      this.isTemplate2Chosen = false;
      this.isTemplateChosen = true;
      this.formData.templateEr = intentionText;
      console.log('intentionText', intentionText);
      return this.isTemplate2Chosen
    }
    
    return this.isTemplateChosen
  }

  validateChoice(intentionText: string){
    this.formData.templateEr = intentionText;
  }

  displaytemplate() {
    if (this.formData.request_type == 1) {
      this.formData.templateEr = this.otherTypeData[0].template1;
      this.isChosen = true;
      this.isTemplate = 1;
    } else if (this.formData.request_type == 2) {
      this.formData.templateEr = this.otherTypeData[1].template1;
      this.isChosen = true;
      this.isTemplate = 2;
    } else if (this.formData.request_type == 3) {
      this.formData.templateEr = this.otherTypeData[2].template1;
      this.isChosen = true;
      this.isTemplate = 3;
    } else {
      this.formData.templateEr = "";
    }
  }

  // isOnAddDefunt(){
  //   this.onAddDefunt = !this.onAddDefunt;
  //   console.log(this.onAddDefunt)
  // }

  // isOnRemoveDefunt(){
  //   this.onAddDefunt = false;
  //   console.log(this.onAddDefunt)
  // }
  

  onSubmit() {
    // ~~~~~~~ Generate transaction id ~~~~~~~ //
    this.dataRandom={
      includeUpperCase: true,
      includeNumbers: true,
      length: 20,
      startsWithLowerCase: true
    } 

    const transactionIdGenerated = this.strRandom(this.dataRandom);
    this.formData.transaction_id = transactionIdGenerated;
    console.log(this.formData.transaction_id)

    // ~ Data initialization for cinetpay api  //
    this.dataCinetPay={
      currency: "XOF",
      apikey: "14117676435c922fc9013224.51931229",
      site_id: "629910",
      transaction_id: transactionIdGenerated,
      amount: 100,
      description: "TRANSACTION DESCRIPTION",
      customer_id: "1",
      customer_name: "",
      customer_surname: "",
      customer_email: "",
      customer_phone_number: environment.customer_phone_number,
      customer_address: "",
      customer_city: "",
      customer_country: "",
      customer_state: "",
      customer_zip_code: "",
      return_url: `${environment.apiUrlMesse}/return_url`,
      notify_url: `${environment.apiUrlMesse}/notify_url`,
      metadata: "User001",
      channels: "ALL",
    }

    // console.log(this.formData);
    this.messeService.addMasseRequest(this.formData).subscribe(
      (data) => {
        console.log(data)
        this.globalService.sendDataToCinetPay(this.dataCinetPay).subscribe(
          data =>{
            //Redirect to payment page of cinetpays
            document.location.href = data.data.payment_url
          }
        )
      },
    );
  }
 

  onNextClick() {
    if(this.currentStep <= 4){
      this.currentStep++;
    }
  }

  onPreviousClick() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  

  checkNext(){
    if(this.currentStep == 1){
      if(this.formData.lastNameMr == '' || this.formData.firstNameMr == '' || this.formData.contactMr == '' ){
        console.log('empty')
      }else if(this.formData.lastNameMr !== '' && this.formData.firstNameMr !== '' && this.formData.contactMr !== ''){
        this.onNextClick();
      }
    }else if(this.currentStep == 2){
      if(this.formData.templateEr == '' && this.formData.request_type == 0 ){
        console.log('empty')
      }else if(this.formData.templateEr !== '' || this.formData.request_type == 0){
        this.onNextClick();
      }
    }else if(this.currentStep == 3){
      if(this.formData.startDateMr == ''){
        console.log('empty')
      }
      else if(this.formData.startDateMr !== ''){
        this.onNextClick();
      }
    }

  }


  // ~~~~~~~~~~~~~~~~ Defunt input hard value reset ~~~~~~~~~~~~~~~~ //


  addDefunt(){
   if(this.defunt == 1){
    this.defunt++;
    console.log(this.defunt)
   }else if(this.defunt == 2){
    this.defunt++;
    console.log(this.defunt)
   }else if(this.defunt == 3){
    this.defunt == 3;
    console.log(this.defunt)
   }
  }

  removeDefunt(){
    if(this.defunt == 3){
      this.formData.defunt3 = "";
      this.defunt--;
    }else if(this.defunt == 2){
      this.formData.defunt2 = "";
      this.defunt--;
    }
  }

  strRandom(o:RandomText) {
    var a = 10,
        b = 'abcdefghijklmnopqrstuvwxyz',
        c = '',
        d = 0,
        e = ''+b;
    if (o) {
      if (o.startsWithLowerCase) {
        c = b[Math.floor(Math.random() * b.length)];
        d = 1;
      }
      if (o.length) {
        a = o.length;
      }
      if (o.includeUpperCase) {
        e += b.toUpperCase();
      }
      if (o.includeNumbers) {
        e += '1234567890';
      }
    }
    for (; d < a; d++) {
      c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
  }



}