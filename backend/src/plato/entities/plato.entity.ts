import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Entity('platos')
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'numeric', precision: 6, scale: 2 })
  precio: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.platos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_categoria' })
  id_categoria: Categoria;
}
