import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Carta } from 'src/carta/entities/carta.entity';

@Entity('imagenes_carta')
export class ImagenesCarta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Carta, (carta) => carta.imagenes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_carta' })
  id_carta: Carta;
}
