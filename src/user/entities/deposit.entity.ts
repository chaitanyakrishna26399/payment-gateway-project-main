import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Deposit {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    userId: number;
  
    @Column()
    transactionId: string;
  
    @Column()
    orderId: number;

    @Column()
    amount: number;

    @Column()
    transType: string;

    @Column()
    status: string;
  
  }
  
