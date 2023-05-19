import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  @Entity()
  export class Assign {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("text", { array: true, nullable: true })
    merchantEmail: string[];
  
    @Column()
    userEmail: string;
  
  //   @Column()
  //   confirmPassword: string;

  }
  