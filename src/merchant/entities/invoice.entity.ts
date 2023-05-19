import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique
  } from 'typeorm';
  
  @Entity()
  export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    merchantId:string

    @Column()
    invoiceRefId: string;

    @Column({type:"bigint"})
    mobile: number;


    @Column({nullable:true})
    billTo: string;

    @Column()
    billFrom: string;

    @Column({nullable:true,default:false})
    status:boolean

    @Column()
    createdAt: Date;

    @Column({nullable:true})
    totalamount: number;

    @Column({nullable:true})
    expirydate: string;

    @Column({nullable:true})
    qrRawData: string;

    @Column({nullable:true})
    numberOfTimes: number;

    @Column({nullable:true})
    qrImage: string;

    @Column({nullable:true})
    reference1:string

    @Column({nullable:true})
    reference2:string

    @Column({nullable:true,default:false})
    void:boolean

    @Column({ type: "simple-json" ,nullable:true})
    note: {
      notes: string;
  };

  }
  
