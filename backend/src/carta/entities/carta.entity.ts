import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Entity('cartas')
export class Carta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column()
  imagen_url: string;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.cartas)
  @JoinColumn({ name: 'id_restaurante' })
  restaurante: Restaurante;
}
