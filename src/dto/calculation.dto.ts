import { IsNumber, IsNotEmpty } from 'class-validator';
export class CreateCalculationDto {
  @IsNotEmpty()
  @IsNumber()
  GBQ: number;
  @IsNotEmpty()
  @IsNumber()
  DEQ: number;
  @IsNotEmpty()
  @IsNumber()
  ZSQ: number;
  @IsNotEmpty()
  @IsNumber()
  DFQ: number;
  @IsNotEmpty()
  @IsNumber()
  DSQ: number;
  @IsNotEmpty()
  @IsNumber()
  DBQ: number;
}
export class entryPointDto {
  @IsNotEmpty()
  @IsNumber()
  L: number;
  @IsNotEmpty()
  @IsNumber()
  D: number;
  @IsNotEmpty()
  @IsNumber()
  H: number;
  @IsNotEmpty()
  @IsNumber()
  O: number;
}
