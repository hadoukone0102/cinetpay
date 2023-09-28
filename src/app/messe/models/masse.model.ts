// Masse Request structure
export interface MasseRequest{
    lastNameMr: string,
    firstNameMr: string,
    contactMr: string,
    transaction_id: string, //pas necessaire
    isAnonymous: false,
    startDateMr: string,
    payeurRequestmesse: string,//pas necessaire
    masses_id: number,//id de la messe selectionner par l'utilisateur
    masses_types_id: number,//1 quotidienne 2 pour neuvieme 3 trentaine
    request_type: number,// 1 action de grace, 2 autres, 3 repos eternelle
    templateEr: string,
    defunt1: string,
    defunt2: string,
    defunt3: string
}

export interface DataResult{
    message: string,
    success: number,
    status_code: number
}