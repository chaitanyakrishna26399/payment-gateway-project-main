import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';



@Entity()
export class DeepLink {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    merchantId: string;

    @Column()
    transactionId:string;

    @Column()
    deeplinkUrl:string;

    @Column()
    userRefId:string;

    @Column({ type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    date: Date;
}


