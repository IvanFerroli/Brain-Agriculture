import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateProdutorDto {
  @IsNotEmpty()
  @IsString()
  nome!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos numéricos',
  })
  documento!: string;
}
