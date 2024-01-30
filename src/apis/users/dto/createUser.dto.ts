import { IsEmail, IsString, Length, Matches, Max } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Matches(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{3,6}(?:\.[a-z]{2})?)$/)
  email: string;
  
  @IsString()
  @Max(13)
  nickname: string;
  
  @IsString()  
  @Matches(/(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/)
  password: string;
}

export default CreateUserDto;