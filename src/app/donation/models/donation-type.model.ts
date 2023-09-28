// ~~~~~~~~~~ Get Donation type ~~~~~~~~~~ //

export interface DonationTypeModel {
    success: boolean
    status_code: number
    status_message: string
    types_dons: DonationTypeData[]
  }
  
  export interface DonationTypeData {
    id: number
    libelle: string
    montant: number|null
    montant_est_fixe: number|null
    created_at: string
    updated_at: string
    deleted_at: any
  }