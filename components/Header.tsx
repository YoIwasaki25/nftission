import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="bg-gray-900">
        <div className="container flex items-center max-w-4xl px-2 mx-auto py-7">
          <div className="flex flex-wrap items-center w-full mx-auto">
            <div className="flex justify-center w-full font-extrabold text-white lg:w-1/2 lg:justify-start">
              <Link href="/">
                <a className="text-2xl text-gray-900 no-underline hover:text-gray-900 hover:no-underline">
                  🚀 &nbsp; <span className="text-gray-200 ">Nlog</span>
                </a>
              </Link>
            </div>
            <div className="flex content-center justify-between w-full pt-2 lg:w-1/2 lg:justify-end lg:pt-0">
              <ul className="flex items-center justify-center flex-1 list-reset lg:flex-none">
                <li className="px-4 py-1 text-white no-underline">
                  <Link href="/articles">
                    <a>Articles</a>
                  </Link>
                </li>
                {status !== 'loading' && session && (
                  // status が 'loading' ではない(認証情報の取得が完了している) + 認証されている場合
                  <>
                    <li className="px-4 py-1 text-white no-underline">
                      <Link href="/mypage">
                        <a>MyPage</a>
                      </Link>
                    </li>
                    <li className="px-4 py-1 text-white no-underline">
                      <button onClick={() => signOut()}>
                        <a>Log out</a>
                      </button>
                    </li>
                  </>
                )}
                {status !== 'loading' && !session && (
                  <li className="px-4 py-1 text-white no-underline">
                    <button onClick={() => signIn()}>
                      <a>Log in</a>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
