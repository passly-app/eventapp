import Button from '@iziui/react/Button';
import Icon from '@iziui/react/Icon';

interface ButtonGuideProps {
  onStartGuide: () => void;
}

export default function ButtonGuide({ onStartGuide }: ButtonGuideProps) {
  return (
    <Button
      size="small"
      variant="text"
      startIcon={<Icon name="question-circle" />}
      onClick={onStartGuide}
    >
      Ajuda
    </Button>
  );
}