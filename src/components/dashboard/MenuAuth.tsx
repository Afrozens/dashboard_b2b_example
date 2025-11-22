'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Dropdown} from 'antd';
import Link from 'next/link';

import { User } from '@/models/user';
import AvatarGenerate from './AvatarGenerate';
import useSubmit from '@/hooks/useSubmit';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

interface Props {
  user: User;
}

const MenuAuth = ({ user }: Props) => {
    const authService = new AuthService();
    const {isLoading, doSubmit } = useSubmit<undefined, string>()
    const router = useRouter();

    const handleLogout = async () => {
        await doSubmit({data: undefined, callback: authService.logoutAuth})
        router.refresh();
    }

  const baseItems = [
    {
      label: (
        <Link href={`/dashboard/home`} className="text-lg font-semibold lg:text-sm lg:font-light">
          Home
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <button
          onClick={handleLogout}
          className="hover:opacity-80 transition-opacity text-lg font-semibold lg:text-sm lg:font-light"
          type="button"
        >
          {isLoading ? <LoadingOutlined className="text-2xl" /> : 'Logout'}
        </button>
      ),
      key: '2',
    },
  ];

  return (
    <div className={`w-fit flex gap-2 items-center`}>
        <Dropdown menu={{ items: baseItems }} trigger={['click']} placement="bottomRight">
          <button
            type="button"
            className="px-2 transition-all hover:opacity-90"
          >
            <div className="flex items-center gap-4 px-2 py-1">
                  <AvatarGenerate
                    name={user.name ?? user.email}
                    size={40}
                  />
            </div>
          </button>
        </Dropdown>
    </div>
  );
};

export default MenuAuth;