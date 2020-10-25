import { HttpException } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { MyContext } from "src/utils/types";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/user.dto";
import argon from 'argon2';

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
    ): Promise<UserDto[]>
    {
        return this.authService.users();
    }

    @Mutation( () => UserDto )
    async register (
        @Args( 'name' ) name: string,
        @Args( 'email' ) email: string,
        @Args( 'password' ) password: string,
        @Context() { req }: MyContext
    ): Promise<UserDto>
    {
        if ( req.session.user )
        {
            throw new HttpException( 'Not Authorized', 401 );
        }
        const hashedPassword = await argon.hash( password );
        const newUser = await this.authService.register( { name, email, password: hashedPassword } );

        req.session.user = newUser._id;

        return newUser;
    }

    @Mutation( () => UserDto )
    async login (
        @Args( 'email' ) email: string,
        @Args( 'password' ) password: string,
        @Context() { req }: MyContext
    ): Promise<UserDto>
    {
        if ( req.session.user )
        {
            throw new HttpException( 'Not Authorized', 401 );
        }

        const user = await this.authService.findByEmail( email );

        req.session.user = user._id;

        return user;
    }

    @Mutation( () => Boolean )
    async logout (
        @Context() { req }: MyContext
    )
    {
        const currentUser = req.session.user;

        if ( !currentUser )
        {
            throw new HttpException( 'Not Authenticated', 401 );
        }

        req.session.destroy( ( err ) =>
        {
            if ( err )
            {
                console.error( err );
            }
        } );
        return true;
    }


    @Query( () => UserDto )
    async getMe (
        @Context() { req }: MyContext
    )
    {
        const currentUser = req.session.user;

        if ( !currentUser )
        {
            throw new HttpException( 'Not Authenticated', 401 );
        }

        const user = await this.authService.findById( currentUser );
        return user;
    }

    @Mutation( () => UserDto )
    async delete (
        @Args( 'id' ) id: string,
    ): Promise<UserDto>
    {
        return this.authService.delete( id );
    }
}