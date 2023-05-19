import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Qrcode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    merchantId: string;
    
    @Column()
    expiryDate:string;

    @Column()
    qrRawData:string;

    @Column()
    numberOfTimes:number;

    @Column()
    qrImage:string;

    @Column({nullable:true})
    createdAt: Date;
}