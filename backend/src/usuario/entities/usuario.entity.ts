import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Restaurante } from '../../restaurante/entities/restaurante.entity';
import { Valoracion } from 'src/valoracion/entities/valoracion.entity';

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
}
