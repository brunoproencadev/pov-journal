import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// For now, use hardcoded credentials until database is connected
const DEMO_USERS = [
  {
    id: '1',
    name: 'Laura Reis',
    email: 'laura@pov.com',
    password: 'pov2026',
    role: 'ADMINISTRADOR',
  },
  {
    id: '2',
    name: 'Ryan',
    email: 'ryan@pov.com',
    password: 'pov2026',
    role: 'JORNALISTA',
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        // Demo auth — replace with Prisma query when DB is connected
        const user = DEMO_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as Record<string, unknown>).role as string;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'pov-secret-dev-only-change-in-production',
});
