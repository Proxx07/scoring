export type CardTypes = 'uzcard' | 'humo';

export interface ICardPostBody {
  pan: string
  expiry: string
  // contractorId: string
  orderId: string
}

export interface ICard {
  pan: string
  holderName: string
  expiry: string
  type: CardTypes
}
