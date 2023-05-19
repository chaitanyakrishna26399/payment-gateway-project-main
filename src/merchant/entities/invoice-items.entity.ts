import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class InvoiceItems {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    invoiceId: number;

    @Column()
    orderId: number;
  
    @Column()
    items: string;

    @Column()
    amount: number;

    @Column()
    createdAt: Date;
}