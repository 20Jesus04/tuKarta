import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Restaurante } from '../../restaurante/entities/restaurante.entity';
import { Valoracion } from 'src/valoracion/entities/valoracion.entity';
import { Favorito } from 'src/favorito/entities/favorito.entity';

export enum RolUsuario {
  USUARIO = 'USUARIO',
  DUENO = 'DUENO',
  ADMIN = 'ADMIN',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
  })
  rol: RolUsuario;

  @OneToMany(() => Restaurante, (restaurante) => restaurante.dueno)
  restaurantes: Restaurante[];

  @OneToMany(() => Valoracion, (valoracion) => valoracion.id_usuario)
  valoraciones: Valoracion[];

  @OneToMany(() => Favorito, (favorito) => favorito.usuario)
  favoritos: Favorito[];

  // @Column({ nullable: true })
  // tokenRecuperacion: string;

  // @Column({ nullable: true, type: 'timestamp' })
  // tokenExpiracion: Date;
}
