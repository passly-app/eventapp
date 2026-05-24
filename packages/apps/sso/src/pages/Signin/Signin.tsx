import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@iziui/react/Box';
import Icon from '@iziui/react/Icon';
import Slide from '@iziui/react/animations/Slide';
import Input from '@iziui/react/Input';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import Container from '@iziui/react/Container';
import ButtonIcon from '@iziui/react/ButtonIcon';
import Typography from '@iziui/react/Typography';
import { Card, CardContent } from '@iziui/react/Card';
import { Form, Control, useForm } from '@iziui/react/lab/Form';

import { getParams } from '@eventapp/toolkit/url';
import { isValidMail } from '@eventapp/toolkit/validators';

import { useAuth } from '@eventapp/modules/auth';

import Logo from '@eventapp/common/components/Logo';

import { release, serverFunctions } from '@/services/core';

function EmailAndPasswordForm() {
  const { email } = getParams<{ email: string }>();

  const navigate = useNavigate();
  const { loginWithPassword, loginWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'text' | 'password'>('password');

  const iconEye = type === 'text' ? 'eye-slash' : 'eye';

  const formGroup = useForm<{ email: string; password: string }>({
    form: {
      email: {
        defaultValue: email || '',
        type: 'email',
        validators: [
          (v) => !v.value && 'Email é obrigatório',
          (v) => !isValidMail(v.value) && 'Email inválido'
        ]
      },
      password: { defaultValue: '', },
    },
    handle: {
      submit: (form) => {
        if (!form.isValid) { return; }

        setLoading(true);
        const { email, password } = form.values;

        loginWithPassword({ email, password })
          .then(async (token) => {
            const { url } = await serverFunctions.getFunction('onRedirect', { token });

            window.open(url, '_self');
          })
          .finally(() => setLoading(false));
      }
    },
  }, []);

  const toggleType = () => { setType(prev => prev === 'text' ? 'password' : 'text'); };

  const goToSignup = () => { navigate('/signup'); };

  const handleLoginWithGoogle = async () => {
    console.log('>>> LALAL');
    return loginWithGoogle()
      .then(async (token) => {
        console.log('>>> token', token);

        const { url } = await serverFunctions.getFunction('onRedirect', { token });

        window.open(url, '_self');
      });
  };

  return (
    <Form formGroup={formGroup} style={{ width: '100%' }}>
      <Stack gap={8}>
        <Control
          controlName="email"
          field={(control) => <Input
            fullWidth
            placeholder="Email"
            data-cy="email-input"
            value={control.value}
            error={control.isInvalid}
            helperText={control.error}
          />}
        />
        <Control
          controlName="password"
          field={(control) => <Input
            fullWidth
            type={type}
            placeholder="Senha"
            data-cy="password-input"
            value={control.value}
            error={control.isInvalid}
            helperText={control.error}
            endIcon={
              <ButtonIcon type="button" onClick={toggleType}>
                <Icon name={iconEye} />
              </ButtonIcon>
            }
          />}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          data-cy="signin-submit"
          disabled={loading}
          loading={loading && <Loading />}
        >
          Entrar
        </Button>
        <Typography
          fullWidth
          color="text.secondary"
          style={{ textAlign: 'center' }}
        >
          ou
        </Typography>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          type="button"
          startIcon={
            <img
              src="https://cdn.clubedoafiliado.com/assets/icons/google.svg"
              width={15}
            />
          }
          sx={{ color: ({ text }) => text.secondary }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleLoginWithGoogle}
        >
          Entrar com o Google
        </Button>
        <Stack flexDirection="row" justifyContent="center" alignItems="center">
          <Typography
            color="text.primary"
            variant="body2"
            style={{ textAlign: 'center' }}
          >
            Não possui conta?
          </Typography>
          <Button
            size="small"
            type="button"
            variant="text"
            data-cy="signup-button"
            onClick={goToSignup}
          >
            Criar conta
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default function Signin() {
  return (
    <Slide enter direction="top">
      <Stack
        alignItems="center"
        justifyContent="center"
        style={{ height: '100vh' }}
        sx={{ backgroundColor: ({ background }) => background.paper }}
      >
        <Container sm="100%" md={500} lg={500} sx={{ p: 1 }}>
          <Stack alignItems="center" sx={{ mb: 3 }}>
            <Logo width={250} />
          </Stack>
          <Card sx={{ backgroundColor: ({ background }) => background.default }}>
            <CardContent>
              <Stack gap={8}>
                <Typography color="text.primary">Login</Typography>
                <EmailAndPasswordForm />
              </Stack>
            </CardContent>
          </Card>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: 'center' }}
            >
              © 2026 - Event App
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ textAlign: 'center' }}
            >
              Versão: {release}
            </Typography>
          </Box>
        </Container>
      </Stack>
    </Slide>
  );
}