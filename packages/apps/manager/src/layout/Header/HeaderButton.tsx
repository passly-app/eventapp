import Button from '@iziui/react/Button';

import override from '@eventapp/core/override';

export default override(Button, {
  color: 'grey',
  style: {
    textTransform: 'capitalize',
  }
});