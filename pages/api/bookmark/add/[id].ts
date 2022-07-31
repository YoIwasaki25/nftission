import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

// リクエスト、レスポンスの型指定
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  // sessionオブジェクトにemailが存在するかの判定
  if (session?.user?.email) {
		// ある一件のデータを更新する処理
    const result = await prisma.article.update({
			// where： 更新データを指定
      where: {
        id: Number(req.query.id),
      },

			// data: prismaの更新処理に必須
      data: {
        users: {
          connect: { email: session?.user?.email },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
