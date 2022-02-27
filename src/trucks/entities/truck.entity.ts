// import { Driver } from '../../drivers/entities/driver.entity';
// import { Exclude, Transform } from 'class-transformer';
// import { IsDefined, IsOptional, Max, Min } from 'class-validator';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   Index,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
//   OneToOne,
//   JoinColumn,
// } from 'typeorm';

// @Entity()
// export class Truck {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @CreateDateColumn()
//   created: Date;

//   @UpdateDateColumn()
//   updated: Date;

//   @Column({ type: 'boolean', default: false })
//   owned_by_company: boolean;
//   // Custom Columns
//   @Column({ type: 'smallint' })
//   @IsDefined()
//   year: number;

//   @Column({})
//   @IsDefined()
//   make: string;

//   @Column()
//   @IsDefined()
//   model: string;

//   @Column()
//   @IsDefined()
//   color: string;

//   @Column()
//   @IsDefined()
//   owner_name: string;

//   @Column()
//   @IsDefined()
//   owner_phone: string;

//   @Column({ unique: true })
//   @IsDefined()
//   @Min(6)
//   @Max(255)
//   owner_email: string;

//   @Column()
//   @IsDefined()
//   unit_number: string;

//   @Column()
//   @IsDefined()
//   registration_number: string;

//   @Column()
//   @IsDefined()
//   vin_number: string;

//   @OneToOne((type) => Driver, (driver) => driver.truck, {
//     cascade: ['insert', 'update'],
//   })
//   @IsOptional()
//   @JoinColumn()
//   driver: Driver;

//   // @Column('date')
//   // @IsOptional() //@TODO: REMOVE
//   // cdl_expiration: string;

//   // @Column('smallint')
//   // @IsDefined()
//   // experience_years: number;

//   @Column('text', { array: true, default: [] })
//   @IsOptional()
//   comments: string[];
// }
