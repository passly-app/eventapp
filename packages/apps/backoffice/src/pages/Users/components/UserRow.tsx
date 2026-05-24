import copy from 'copy-to-clipboard';

import Icon from '@iziui/react/Icon';
import Chip from '@iziui/react/Chip';
import Stack from '@iziui/react/Stack';
import Avatar from '@iziui/react/Avatar';
import ButtonIcon from '@iziui/react/ButtonIcon';
import { TableCell } from '@iziui/react/Table';
import Slide from '@iziui/react/animations/Slide';
import { useToast } from '@iziui/react/Toast';

import type { UserData } from '@eventapp/modules/user';

interface UserRowProps {
  user: UserData;
  index: number;
  onView: (user: UserData) => void;
}

export default function UserRow({ user, index, onView }: UserRowProps) {
  const { addToast } = useToast();

  const handleCopyId = () => {
    copy(user.id);
    addToast({
      message: 'Id copiado',
      color: 'success',
      icon: <Icon name="check" />,
      delay: 5000
    });
  };

  const handleEditUser = () => { onView(user); };

  return (
    <Slide
      enter
      key={user.id}
      tag="tr"
      direction="left"
      delay={(index + 1) * 100}
    >
      <TableCell>
        <Stack flexDirection="row" gap={8} alignItems="center ">
          <ButtonIcon onClick={handleCopyId} color="grey" size={32}>
            <Icon name="copy" />
          </ButtonIcon>
          {[user.id.slice(0, 10), '...'].join('') || '-'}
        </Stack>
      </TableCell>
      <TableCell>
        <Stack flexDirection="row" gap={8} alignItems="center ">
          <Avatar src={user.picture} />
          {user.name}
        </Stack>
      </TableCell>
      <TableCell>{user.email || '-'}</TableCell>
      <TableCell>
        <Stack flexDirection="row" gap={8}>
          {
            user.roles.map(role => (
              <Chip
                key={role}
                label={role}
                icon={<Icon name="shield" />}
              />
            ))
          }
        </Stack>
      </TableCell>
      <TableCell align="center">
        <ButtonIcon
          size={32}
          color="grey"
          style={{ margin: 'auto' }}
          onClick={handleEditUser}
        >
          <Icon name="eye" />
        </ButtonIcon>
      </TableCell>
    </Slide>
  );
}