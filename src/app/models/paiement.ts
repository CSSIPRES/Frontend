export interface Paiement{
    numeroOrdreVirement?:string,
    banqueSource?:string,
    numeroCompteSource?:string,
    banqueDestination?:string,
    numeroCompteDestination?:string,
    referenceFacture?:string,
    montantTotal?:number,
    montantAccount?:number,
    etat?:string,
    fileJoin?:string,
    id_user?:string,
    user?:any
  }