import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { ImagenesCarta } from 'src/imagenes-carta/entities/imagenes-carta.entity';

@Entity('cartas')
export class Carta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.cartas)
  @JoinColumn({ name: 'id_restaurante' })
  restaurante: Restaurante;

  @OneToMany(() => Categoria, (categoria) => categoria.id_carta)
  categorias: Categoria[];

  @OneToMany(() => ImagenesCarta, (imagen) => imagen.id_carta)
  imagenes: ImagenesCarta[];
}
