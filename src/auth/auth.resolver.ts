import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { ErrorResponse } from "src/utils/errorResponse";
import { MyContext } from "src/utils/types";
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
    async users (
        @Context() { }: MyContext
    ): Promise<UserDto[]>
    {
        throw new ErrorResponse( 'nah', 400 );
        // return await this.authService.users();
    }

    @Mutation( () => UserDto )
    async register (
        @Args( 'name' ) name: string,
        @Args( 'email' ) email: string,
        @Args( 'password' ) password: string,
    ): Promise<UserDto>
    {
        return this.authService.register( { name, email, password } );
    }

    @Mutation( () => UserDto )
    async delete (
        @Args( 'id' ) id: string,
    ): Promise<UserDto>
    {
        return this.authService.delete( id );
    }
}