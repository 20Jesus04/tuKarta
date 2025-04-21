import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Carta } from 'src/carta/entities/carta.entity';

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

  @Column()
  id_dueno: number;

  @OneToMany(() => Carta, (carta) => carta.restaurante)
  cartas: Carta[];
}
