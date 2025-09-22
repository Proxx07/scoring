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

  prepaymentAmount: number
  monthlyPaymentAmount: number
  totalAmount: number
}

export interface IRepaymentSchedule {
  order: number
  date: string
  amount: number
  payment: number
  principalPayment: number
  interestPayment: number
  rest: number
}
