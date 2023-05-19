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
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true,type:"bigint"})
  mobile: number;

  @Column({ unique : true})
  email: string;

  @Column()
  password: string;

  @Column({ nullable : true})
  surName: string;

  @Column({ nullable : true})
  address: string;

  @Column({ nullable : true})
  province: string;

  @Column({ nullable : true})
  district: string;

  @Column({ nullable : true})
  subdistrict: string;

  @Column({ nullable : true})
  pincode: string;

//   @Column()
//   confirmPassword: string;

  @BeforeInsert()
  private hashPassword = () => {
    this.password = bcrypt.hashSync(this.password, 10);
  };

  @BeforeUpdate()
  private hashPass?() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
