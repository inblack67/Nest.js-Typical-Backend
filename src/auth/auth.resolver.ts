import { Resolver, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/user.dto";

@Resolver()
export class AuthResolver
{
    constructor ( private readonly authService: AuthService ) { }

    @Query( () => String )
    hello (): string
    {
        return 'nest';
    }

    @Query( () => [ UserDto ] )
    async users (): Promise<UserDto[]>
    {
        return [];
    }
}