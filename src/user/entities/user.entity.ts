import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  @Entity()
  @Unique(['email'])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column({type : "bigint"})
    mobile: number;
  
    @Column()
    email: string;
  
    @Column()
    password: string;

    @Column({nullable:true})
    userName: string;


    @Column({nullable:true})
    personType: string;


    @Column({nullable:true})
    InitialShop: string;


    @Column({nullable:true})
    firstName: string;


    @Column({nullable:true})
    surName: string;


    @Column({nullable:true})
    yearOfBirth: string;


    @Column({nullable:true})
    monthOfBirth: string;


    @Column({nullable:true})
    dayOfBirth: string;


    @Column({nullable:true})
    address: string;


    @Column({nullable:true})
    province: string;


    @Column({nullable:true})
    district: string;


    @Column({nullable:true})
    subDivision: string;


    @Column({nullable:true})
    pincode: number;


    @Column({nullable:true})
    shopType: string;

    @Column({nullable:true})
    mobilePayment: boolean;

    @Column({nullable:true})
    bankTransfer: boolean;

    @Column({nullable:true})
    website: string;


    @Column({nullable:true})
    facebook: string;


    @Column({nullable:true})
    linkedin: string;


    @Column({nullable:true})
    instagram: string;


    @Column({nullable:true})
    other: string;


    @Column({nullable:true})
    company: string;


    @Column({nullable:true})
    bank: string;


    @Column({type:"bigint",nullable:true})
    bankAccount: number;


    @Column({nullable:true})
	  rnfCode: string;


    @Column({nullable:true})
    domestic: string;


    @Column({nullable:true})
    inter: string;

    @Column({nullable:true})
    rateQrCode: string;

    @Column({nullable:true})
    rateBarCode: string;

    @Column({nullable:true})
    copyOfId: string;

    @Column({nullable:true})
    logo: string;

    @Column({nullable:true})
    bankBook: string;

    @Column({nullable:true})
    otherDocument: string;

    @Column("text", { array: true, nullable: true })
    merchantEmail: string[];

    
  @Column({nullable: true})
  typeOfStreem:string;
  
    
    @BeforeInsert()
    private hashPassword = () => {
      this.password = bcrypt.hashSync(this.password, 10);
    };
  
    @BeforeUpdate()
    private hashPass?() {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
  
