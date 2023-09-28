export interface DataCinetPay {
    currency: string
    apikey: string
    site_id: string
    transaction_id: string
    amount: number
    description: string
    customer_id: string
    customer_name: string
    customer_surname: string
    customer_email: string
    customer_phone_number: string
    customer_address: string
    customer_city: string
    customer_country: string
    customer_state: string
    customer_zip_code: string
    return_url: string
    notify_url: string
    metadata: string
    channels: string
   
  }
  
  //result

  export interface DataResultCinetPay {
    code: string
    message: string
    description: string
    data: ResultCinetPay
    api_response_id: string
  }
  
  export interface ResultCinetPay {
    payment_token: string
    payment_url: string
  }
  
  