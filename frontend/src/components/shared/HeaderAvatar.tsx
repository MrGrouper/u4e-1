import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

type Props = {
  size: number;
};

function stringAvatar(name: string) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const HeaderAvatar = ({ size }: Props) => {
  const { user } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setAvatarSrc(user.avatarUrl);
    }
  }, [user]);

  if (!avatarSrc) {
    return (
      <Avatar
        {...stringAvatar(`${user?.firstname} ${user?.lastname}`)}
        sx={{ width: size, height: size, bgcolor: 'success.main' }}
      />
    );
  } else {
    return (
      <Avatar
        src={avatarSrc}
        sx={{ width: size, height: size }}
        alt={`${user?.firstname} ${user?.lastname}`}
      />
    );
  }
};

export default HeaderAvatar;
