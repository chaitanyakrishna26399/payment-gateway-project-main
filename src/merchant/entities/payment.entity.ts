import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    resdesc: string;

    @Column()
    rescode: string;

    @Column({type:"bigint",nullable :true})
    transactionid: number;

    @Column({type:"bigint",nullable :true})
    confirmid: number;

    @Column()
    createdAt: Date;
}