// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   Index,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import { Exclude, Transform } from 'class-transformer';
// import { IsDefined, IsOptional, Max, Min } from 'class-validator';

// export enum UserRole {
//   ADMIN = 'admin',
//   DISPATCHER = 'dispatcher',
//   MANAGER = 'manager',
// }

// @Index(['email'], { unique: true })
// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @CreateDateColumn()
//   created: Date;

//   @UpdateDateColumn()
//   updated: Date;

//   @Column()
//   @IsDefined()
//   @Min(6)
//   @Max(255)
//   @IsOptional()
//   name: string;

//   @Column({ unique: true })
//   @IsDefined()
//   @Min(6)
//   @Max(255)
//   email: string;

//   @Column()
//   @IsDefined()
//   @Min(6)
//   @Max(100)
//   @Exclude()
//   password: string;

//   @Column({ enum: UserRole, default: UserRole.DISPATCHER })
//   @IsOptional()
//   role: UserRole;

//   // @OneToMany(type => Photo, photo => photo.user)
//   // photos: Photo[];
// }
