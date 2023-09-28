export interface DataCountry {
    push(arg0: { text: any; value: any }): unknown
    status: string
    status_code: number
    status_message: string
    total_pays: number
    pays: Country[]
  }
  
  export interface Country {
    id: number
    Sort_Order: string
    Commo_Name: string
    Formal_Name: string
    Type: string
    Sub_Type: string
    Sovereignty: string
    Capital: string
    ISO_4217_Currency_Code: string
    ISO_4217_Currency_Name: string
    ITU_T_Telephone_Code: string
    ISO_3166_1_2_Letter_Code: string
    ISO_3166_1_3_Letter_Code: string
    ISO_3166_1_Number: string
    IANA_Country_Code_TLD: string
    created_at: any
    updated_at: any
  }