import { Component,OnInit } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { ActivatedRoute } from '@angular/router';
import {  map } from 'rxjs';

import { CoreService } from 'src/app/core/services/core.service';
import { DataCinetPay } from '../../models/cinetpay.model';
import { RandomText } from 'src/app/global/models/random.model';
import { GlobalService } from 'src/app/global/services/global.service';
import { environment } from 'src/environments/environments';
import { DataDonation } from '../../models/donation.model';
import { DonationTypeModel } from '../../models/donation-type.model';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.css']
})

export class AnonymousComponent implements OnInit {
  // ~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~ //
  dataCinetPay!:DataCinetPay;
  dataDonation!:DataDonation;
  donationTypes!: DonationTypeModel;
  
  // ~~~~~~~~~~~~~~ form data ~~~~~~~~~~~~~~ //
  formData!: DataDonation;
  typeValue: number = 1;
  typeLibelle!: string|undefined;
  customType!: string;
  
  // ~~~~~~~~~ Radio for fix amount ~~~~~~~~ //
  firstAmount!: number;
  secondAmount!: number;
  thirdAmount!: number;

  // ~~~ Random string for transaction id ~~ //
  dataRandom!:RandomText;
  
  // ~~~~~~~~~~~~~~~~ boolean ~~~~~~~~~~~~~~ // 
  isForm!:boolean;
  typeIsOther!: boolean;
  imageLoaded: boolean = false;
  isFixed!:boolean;

  constructor(private coreService: CoreService,
    private route : ActivatedRoute,
    private donationService: DonationService,
    private globalService: GlobalService 
    ) {}
    
    
  ngOnInit() {
    // ~~~~~~~ Get data from resolvers ~~~~~~~ //
    this.route.data.pipe(
      map(data => data['donationTypeResolver']),).subscribe(
        data=>{
          this.donationTypes=data;
        }
      );

    this.typeIsOther=false;
    this.isForm=true;
    this.customType="";
    
    // ~~~~~~~~~ Initialize formData ~~~~~~~~~ //
    this.formData = {
      transactionId: "",
      typeDon: null,
      autreTypeDon: null,
      montantDon: null,
      civiliteDon: "",
      nomDon: "",
      prenomDon: "",
      contactDon: "",
      paysDon: "",
      villeDon: "",
      organisationDon : "",
      estAnonyme: 1,
      estOrganisation: 0,
      idEglise: "1",
    }

    this.onChangeDonationType(this.typeValue);
  }

  /**
   * Switch between overview page and form page
   * @date 7/13/2023 - 7:16:22 PM
   */
  switchPage(){
    //show the value of custom type is type selected is "Autre"
    if(this.typeIsOther){
      this.typeLibelle = this.customType;
      this.formData.typeDon = null;
      this.formData.autreTypeDon = this.customType;
    }
    this.isForm = this.isForm ? false : true;
  }
  
  /**
   * Return true if amount field value is a multiple of 5
   * @date 7/13/2023 - 7:22:51 PM
   *
   * @returns {boolean}
   */
  isMultipleOf5(){
    const amount = this.formData.montantDon ?? 0;
    if(amount % 5 === 0){
      return true;
    }else{
      return false;
    }
  }
 
 /**
  * Go to donation type menu
  * @date 7/13/2023 - 7:30:56 PM
  */
 goToDonationTypeMenu(){
    this.coreService.goToDonationType();
  }

  /**
   * Check if donation type selected is "Autre"
   * @date 7/13/2023 - 7:24:08 PM
   *
   * @param {number} id
   */
  onChangeDonationType(id: number){
    //get the libelle of donation type selected
    if (id != 0) {
      const donationType = this.donationTypes.types_dons.find((ligne) => ligne.id == id);
      this.typeLibelle = donationType?.libelle;

      //Fixe the amount if donation type has fixed amount
      if (donationType?.montant_est_fixe === 1) {
        this.formData.montantDon = donationType.montant;
        this.isFixed = true;
      }else{
        this.isFixed = false;
      }
      
      //Put correct value for typeDon
      this.formData.typeDon = id;
      this.formData.autreTypeDon = null;
    }
    else{
      this.isFixed = false;
      this.typeLibelle = 'Autre';
    }
    
    if(this.typeLibelle==='Autre'){
      this.typeIsOther= true;
    }else{
      this.typeIsOther=false;
    }
  }

  cool(){
    console.log(this.formData);
    
  }

  /**
   * Send data to API
   * @date 7/13/2023 - 7:28:53 PM
   */
  onSubmit(){
    // ~~~~~~~ Generate transaction id ~~~~~~~ //
    this.dataRandom={
      includeUpperCase: true,
      includeNumbers: true,
      length: 20,
      startsWithLowerCase: true
    }
    const transactionIdGenerated = this.strRandom(this.dataRandom);

    // ~ Data initialization for cinetpay api  //
    this.dataCinetPay={
      currency: "XOF",
      apikey: "14117676435c922fc9013224.51931229",
      site_id: "629910",
      transaction_id: transactionIdGenerated,
      amount: this.formData.montantDon ?? 0,
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
      return_url: `${environment.apiUrlDon}/return_url`,
      notify_url: `${environment.apiUrlDon}/notify_url`,
      metadata: "User001",
      channels: "ALL",
    }

    // ~~~~~~~~ Complete the formData ~~~~~~~~ //
    this.formData.transactionId = transactionIdGenerated;

    // ~~~~~~~~~~ Send data to APIs ~~~~~~~~~~ //
    this.donationService.addDonation(this.formData).subscribe(
      data =>{
        this.globalService.sendDataToCinetPay(this.dataCinetPay).subscribe(
          data => {
           //  Redirect to payment page of cinetPays  //
            document.location.href= data.data.payment_url
          },
        );
      }
    );
    
     
  }

  /**
   * Return true if custom type field is correct
   * @date 7/13/2023 - 3:20:12 PM
   */
  customTypeFieldIsCorrect(){
    if(this.customType=="" && this.typeLibelle=='Autre'){
      return true;
    }else{
      return false;
    }
  }

  /**
   * Get the amount of radio input and put in the amount field
   * @date 7/13/2023 - 7:29:29 PM
   *
   * @param {number} amount
   */
  getAmount(amount:number){
      this.formData.montantDon=amount;
  } 

  /**
  * Generates a random string for transaction id
  * @date 7/13/2023 - 7:44:02 PM
  *
  * @param {RandomText} o
  * @returns {string}
  */
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




