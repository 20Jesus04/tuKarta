import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Carta } from 'src/carta/entities/carta.entity';

@Entity('favoritos')
export class Favorito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.favoritos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Carta, (carta) => carta.favoritos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_carta' })
  carta: Carta;

  @CreateDateColumn({ name: 'fecha_agregado' })
  fechaAgregado: Date;
}
