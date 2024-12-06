import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  linkedInId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  location: string;

  @Column('json')
  currentPosition: {
    title: string;
    company: string;
  };

  @Column('simple-array')
  skills: string[];

  @Column()
  category: string;

  @Column({ nullable: true })
  notes: string;

  @Column('json')
  meetingDetails: {
    date: Date;
    event: string;
    location: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
