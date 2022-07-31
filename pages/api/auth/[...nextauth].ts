import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';

import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  // どんな認証方法を採用するのか
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  // どんなアダプターを使うのか。今回はPrismaを採用
  adapter: PrismaAdapter(prisma),

  // 秘密鍵の設定
  secret: process.env.SECRET,

  // ログイン画面の設定
  pages: {
    signIn: '/auth/login',
  },
};
