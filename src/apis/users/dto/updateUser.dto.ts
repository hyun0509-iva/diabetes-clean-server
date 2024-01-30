import { IsString} from "class-validator";
import CreateUserDto from "./createUser.dto";

export class UpdateUserDto extends CreateUserDto{
  @IsString()
  imageSrc: string;

  @IsString()
  aboutMe: string;
}

export default UpdateUserDto;