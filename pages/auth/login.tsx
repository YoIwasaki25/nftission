import { getProviders, signIn } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

const login = ({
  // ここで型定義をする
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex flex-col items-center pt-40 space-y-20">
      <Image
        src="/images/github-icon.png"
        width={150}
        height={150}
        objectFit="contain"
      />

      <div className="text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flexjustify-center">
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <div key={provider.name}>
                    <button
                      className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium bg-white rounded group transition-all hover:bg-white "
                      // このボタンを押すとgithubによる認証が行われる。
                      // 認証後のリダイレクト先をルートパスに設定
                      onClick={() =>
                        signIn(provider.id, {
                          callbackUrl: '/articles',
                        })
                      }
                    >
                      <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-slate-800 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                      <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                        Sign in with {provider.name}
                      </span>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;

export const getServerSideProps = async () => {
  // ここで認証の方法を取得
  // 複数の認証もここで取得可能
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
