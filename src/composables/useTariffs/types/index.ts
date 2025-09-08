export interface IProduct {
  name: string
  quantity: number
  price: number
}

export interface IHashDecodeObject {
  orderId: string
  products: IProduct[]
  tariffId: string
}

export interface ITariff {
  id: string
  name: string
  monthsCount: number
  markup: number
  prepayPercent: number
  discount: number
}
