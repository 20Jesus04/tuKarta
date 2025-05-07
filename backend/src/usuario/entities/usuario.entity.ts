import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
