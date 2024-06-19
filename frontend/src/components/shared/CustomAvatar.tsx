import { Avatar } from '@mui/material';

type Props = {
    firstName: string | null;
    lastName: string | null
    avatarUrl: string | null;
    size: number
    
  };

  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

const CustomAvatar = (props:Props) => {
    if (!props.avatarUrl) {
  return (
    <Avatar
    {...stringAvatar(`${props.firstName} ${props.lastName}`)}
    sx={{width:props.size, height:props.size, bgcolor:'success.main'}}
    
    />
  )
  }
  else {
    return (
        <Avatar
        src={props.avatarUrl}
        sx={{width:props.size, height:props.size}}
        alt = {`${props.firstName} ${props.lastName}`}
        />
      )

  }
}

export default CustomAvatar