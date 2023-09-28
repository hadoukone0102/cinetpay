import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CoreService } from 'src/app/core/services/core.service';
import * as intlTelInput from 'intl-tel-input';
import { Injectable } from '@angular/core';
import { DataCountry } from 'src/app/global/models/country.model';
import { RandomText } from 'src/app/global/models/random.model';
import { DataCinetPay } from '../../models/cinetpay.model';
import { DonationService } from '../../services/donation.service';
import { DataDonation } from '../../models/donation.model';
import { environment } from 'src/environments/environments';
import { DonationTypeModel } from '../../models/donation-type.model';
import { GlobalService } from 'src/app/global/services/global.service';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-noanonymous',
  templateUrl: './noanonymous.component.html',
  styleUrls: ['./noanonymous.component.css']
})

export class NoanonymousComponent implements OnInit {
  // ~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~ //
  dataCinetPay!:DataCinetPay;
  dataDonation!:DataDonation;
  donationTypes!: DonationTypeModel;
  countries!: DataCountry;

  // ~~~~~~~~~~~~~~ form data ~~~~~~~~~~~~~~ //
  formData!: DataDonation;
  typeValue: number = 1;
  typeLibelle!: string|undefined;
  customType!: string;
  phone!: string;

  // ~~~~~~~~~ Radio for fix amount ~~~~~~~~ //
  firstAmount!: number;
  secondAmount!: number;
  thirdAmount!: number;

  // ~~~~~~~~~~~~~~~~ boolean ~~~~~~~~~~~~~~ // 
  typeIsOther!: boolean;
  isOrga: boolean = false;
  isFixed!:boolean;

  // ~~~ Variables for show correct page ~~~ //
  isFormAmount:boolean = true;
  isFormInfo: boolean = false;
  isRecap:boolean = false;

  // ~~~~~~~~~~~~~~ Subitting ~~~~~~~~~~~~~~ //
  isSubmitting:boolean=false;

  // ~~~~~~~~~~~~~~ Tel input ~~~~~~~~~~~~~~ //
  inputTel!: HTMLInputElement;
  iti!: intlTelInput.Plugin;

  datarandom!: RandomText;
  
  constructor(
    private route:ActivatedRoute, 
    private coreService: CoreService,
    private donationService: DonationService,
    private globalService: GlobalService
    ) {
   
  }
  
  ngOnInit() {
    // ~~~~~~~ Get data from resolvers ~~~~~~~ //
    this.route.data.pipe(
      map(data => data['donationTypeResolver']),).subscribe(
        data=>{
          this.donationTypes=data;
        });

    this.route.data.pipe(
      map(data => data['country'])).subscribe(
      data => this.countries = data
    );

    // ~~~~~~~~~ Initialize formData ~~~~~~~~~ //
    this.formData = {
      transactionId: "",
      typeDon: null,
      autreTypeDon: null,
      montantDon: null,
      civiliteDon: "Monsieur",
      nomDon: "",
      prenomDon: "",
      contactDon: "",
      paysDon: "Cote D'ivoire",
      villeDon: "",
      organisationDon : "",
      estAnonyme: 0,
      estOrganisation: 0,
      idEglise: "1",
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

    // ~~~~~~~~ Initialize typeLibelle ~~~~~~~ //
    this.onChangeDonationType(this.typeValue);
  }
 
 /**
  * Return true if organisation field is correct
  * @date 7/13/2023 - 10:22:38 PM
  *
  * @returns {boolean}
  */
 organisationFieldIsCorrect(){
    if( this.isOrga === true && this.formData.organisationDon === ""){
      return false;
    }else{
      return true;
    }
 }
  
  /**
   * Switch between pages
   * @date 7/13/2023 - 10:30:33 PM
   *
   * @param {boolean} val
   * @param {boolean} val2
   * @param {boolean} val3
   */
  switchPage(val:boolean, val2:boolean, val3:boolean){
    //show the value of custom type is type selected is "Autre"
    if(this.typeIsOther){
      this.typeLibelle = this.customType;
      this.formData.typeDon = null;
      this.formData.autreTypeDon = this.customType;
    }
    //get the full number before to go to overview page
    this.formData.contactDon = this.iti.getNumber();

    this.isFormAmount=val;
    this.isFormInfo=val2;
    this.isRecap=val3;
  }

  /**
   * Send data to API
   * @date 7/14/2023 - 12:32:02 PM
   */
  onSubmit(){
    // ~~~~~~~ Generate transaction id ~~~~~~~ //
    this.datarandom={
      includeUpperCase: true,
      includeNumbers: true,
      length: 20,
      startsWithLowerCase: true
    }
    const transactionIdGenerated=this.strRandom(this.datarandom);

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
      customer_phone_number: "+2250574233173",
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
    this.formData.estOrganisation = this.isOrga ? 1 : 0;
    
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
   * Get the amount of radio input and put in the amount field
   * @date 7/13/2023 - 7:29:29 PM
   *
   * @param {number} amount
   */
  getAmount(amount:number){
    this.formData.montantDon=amount;
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

   /**
    * Go to donation type menu
    * @date 7/13/2023 - 7:30:56 PM
    */
  goToDonationTypeMenu(){
    this.coreService.goToDonationType();
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
   * Generates a random string for transaction id
   * @date 7/14/2023 - 12:31:47 PM
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