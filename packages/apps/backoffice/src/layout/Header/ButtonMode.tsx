import Icon from '@iziui/react/Icon';
import ButtonIcon from '@iziui/react/ButtonIcon';
import { useTheme } from '@iziui/react/theme';

interface ButtonModeProps { onUpdateMode: () => void; }
export default function ButtonMode({ onUpdateMode }: ButtonModeProps) {
  const { theme } = useTheme();

  const modeIcon = theme.mode === 'dark' ? 'moon' : 'sun';

  return (
    <ButtonIcon onClick={onUpdateMode} color="grey">
      <Icon name={modeIcon} />
    </ButtonIcon>
  );
}