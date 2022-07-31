import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // router オブジェクトの取得
  const router = useRouter(); // pageのURL
  const { status } = useSession(); // 認証情報が格納されている

  // React のレンダリング後に実行する
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [router, status]); // 第2引数に関数の実行タイミングを制御する依存データを記述

  if (status === 'unauthenticated') return null;

  return <>{children}</>;
};

export default ProtectedRoute;
