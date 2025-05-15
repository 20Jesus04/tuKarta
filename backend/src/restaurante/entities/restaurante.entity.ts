import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Carta } from 'src/carta/entities/carta.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('restaurantes')
export class Restaurante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  imagen_url: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.restaurantes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_dueno' })
  dueno: Usuario;

  @OneToMany(() => Carta, (carta) => carta.restaurante)
  cartas: Carta[];
}
