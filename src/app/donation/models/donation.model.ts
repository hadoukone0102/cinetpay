  export interface DataDonation {
  transactionId: string
  typeDon: number|null
  autreTypeDon: string|null
  montantDon: number|null
  civiliteDon: string
  nomDon: string
  prenomDon: string
  contactDon: string
  paysDon: string
  villeDon: string
  organisationDon : string
  estAnonyme: number
  estOrganisation: number
  idEglise: string
}


  export interface DataResultDonation2 {
    status: string
    status_code: number
    status_message: string
    errorList: string
  
  }

  export interface DataResultDonation {
    status: string
    status_code: number
    status_message: string
    errosList: ErrosList
  }
  
  export interface ErrosList {
    transactionId: string[]
    montantDon: string[]
    estAnonyme: string[]
    estOrganisation: string[]
    autreTypeDon: string[]
    typeDon: string[]
  }
  
  

  
  