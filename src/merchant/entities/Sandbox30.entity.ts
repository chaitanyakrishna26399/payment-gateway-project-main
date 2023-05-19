import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sandbox30 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  merchantId:string;

  @Column({nullable:true})
  user:string;

  @Column()
  payeeProxyId: string;

  @Column()
  payeeProxyType: string;

  @Column()
  payeeAccountNumber: string;

  @Column()
  payeeName: string;

  @Column()
  payerAccountNumber: string;

  @Column()
  payerAccountName: string;

  @Column()
  payerName: string;

  @Column()
  sendingBankCode: string;

  @Column()
  receivingBankCode: string;

  @Column()
  amount: string;

  @Column()
  transactionId: string;

  @Column()
  transactionDateandTime: string;

  @Column()
  billPaymentRef1: string;


  @Column()
  billPaymentRef2: string;

  @Column()
  billPaymentRef3: string;

  @Column()
  currencyCode: string;

  @Column()
  channelCode: string;

  @Column()
  transactionType: string;

  @Column({ type: "float" })
  finalAmount: number;
}