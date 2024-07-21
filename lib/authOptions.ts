import { AuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

declare module 'next-auth' {
    interface User {
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }

    interface Session {
        user: {
            id?: string;
            name: string | null;
        } & DefaultSession['user'];
    }
}

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              name: {
                    label: "name",
                    type: "text",
                },
                password: {
                    lable: "Contraseña",
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }

                const { name, password } = credentials

                const user = await db.user.findUnique({
                    where: {
                        name
                    }
                })

                if (!user) {
                    return null
                }
                // if (!user || !user.isValid) {
                //     return null
                // }

                const userPassword = user.password
                const isValidPassword = bcrypt.compareSync(password, userPassword!)

                if (!isValidPassword) {
                    return null
                }

                const { password: pass, ...userWithoutPass } = user;

                return { ...userWithoutPass }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/signout",
        newUser: "/auth/registrarse"
    },
    secret: process.env.NEXTAUTH_SECRET,

    jwt: {
        async encode({ secret, token }) {
            if (!token) {
                throw new Error("NO token to encode")
            }
            return jwt.sign(token, secret)
        },
        async decode({ secret, token }) {
            if (!token) {
                throw new Error("NO token to encode")
            }
            const decodedToken = jwt.verify(token, secret)
            if (typeof decodedToken === "string") {

                return JSON.parse(decodedToken)
            } else {
                return decodedToken
            }
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,

    },
    callbacks: {
        async jwt({ token, account, user }) {
            // console.log({ token, account, user });

            if (account) {
                token.accessToken = account.access_token;
                switch (account.type) {
                    case 'oauth':
                        // token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
                        break;
                    case 'credentials':
                        token.user = user;
                        break;
                }
            }
            return token;
        },

        async session({ session, token, user }) {
            // console.log({ session, token, user });

            session.user = user;
            session.user = token.user as any;

            return session;
        }
    }
}