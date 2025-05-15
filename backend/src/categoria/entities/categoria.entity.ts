import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Carta } from 'src/carta/entities/carta.entity';
import { Plato } from 'src/plato/entities/plato.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Carta, (carta) => carta.categorias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_carta' })
  id_carta: Carta;

  @OneToMany(() => Plato, (plato) => plato.id_categoria)
  platos: Plato[];
}
