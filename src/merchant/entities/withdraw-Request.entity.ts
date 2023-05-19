import {
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class withdrawRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({generated: 'uuid'})
    @PrimaryColumn()
    ReferalNumber: string;

    @Column()
    merchantId: string;
    
    @Column({type:"float"})
    amount: number;

    @Column({type:"float"})
    WithdrawCharges:number

    @Column({type:"float"})
    FinalAmount:number;

    @Column({ type: "simple-json" ,nullable:true})
    BankDetails: {
      Name: string;
      AccountNumber:number;
      IFSCcode: string;
      BankName:string
    };

    @Column()
    comments:string;

    @Column({nullable:true,default:false})
    status:boolean

    @Column({nullable:true})
    TransactionId:string

    // @Column({ type: "timestamptz" })
    // createdAt: Date;
}