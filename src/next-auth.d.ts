import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            user: any
            _id: string,
            name: string,
            email: string,
            role: string,
            token: string
        }
    }
}