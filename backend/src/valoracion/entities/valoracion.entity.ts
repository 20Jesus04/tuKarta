import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Carta } from 'src/carta/entities/carta.entity';

@Entity('valoraciones')
export class Valoracion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  puntuacion: number;

  @Column({ type: 'text' })
  comentario: string;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.valoraciones)
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: Usuario;

  @ManyToOne(() => Carta, (carta) => carta.valoraciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_carta' })
  id_carta: Carta;
}
