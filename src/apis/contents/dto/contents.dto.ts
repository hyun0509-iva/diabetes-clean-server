import { IsBoolean, IsString } from "class-validator";

export class CreateContentsDTO {
  @IsString()
  writer: string;
  @IsString()
  contents: string;
  @IsString()
  imageName: string;
  @IsString()
  imageUrl: string;
  @IsBoolean()
  isDeleted: boolean;
}

export class UpdateContentsDTO {
  @IsString()
  contents: string;
  @IsString()
  imageName: string;
  @IsString()
  imageUrl: string;
  @IsBoolean()
  isDeleted: boolean;
}
