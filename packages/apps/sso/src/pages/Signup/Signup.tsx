import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Icon from '@iziui/react/Icon';
import Slide from '@iziui/react/animations/Slide';
import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Button from '@iziui/react/Button';
import Divider from '@iziui/react/Divider';
import Loading from '@iziui/react/Loading';
import Container from '@iziui/react/Container';
import ButtonIcon from '@iziui/react/ButtonIcon';
import Typography from '@iziui/react/Typography';
import { Card, CardContent } from '@iziui/react/Card';
import { Form, Control, useForm } from '@iziui/react/lab/Form';
import Box from '@iziui/react/Box';

import { isValidMail } from '@eventapp/toolkit/validators';

import { useAuth } from '@eventapp/modules/auth';

import Logo from '@eventapp/common/components/Logo';

import { release } from '@/services/core';

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { createByAuth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'text' | 'password'>('password');

  const iconEye = type === 'text' ? 'eye-slash' : 'eye';

  const formGroup = useForm<SignupForm>({
    form: {
      name: { defaultValue: '', type: 'text', },
      email: {
        defaultValue: '',
        type: 'email',
        validators: [
          (c) => !c.value && 'Email é obrigatório',
          (c) => !isValidMail(c.value) && 'Email inválido'
        ]
      },
      password: {
        defaultValue: '',
        validators: [
          (v) => !v.value && 'Senha é obrigatória',
          (v) => v.value.length < 6 && 'A senha deve ter no mínimo 6 caracteres'
        ]
      },
      confirmPassword: { defaultValue: '' },
    },
    handle: {
      submit(form) {
        if (!form.isValid) { return; }
        setLoading(true);

        const { email, name, password } = form.values;

        createByAuth({ email, name, password })
          .then(async (token) => {
            console.log('>>> token', token);
          })
          .finally(() => setLoading(false));
      },
    },
    validator: {
      confirmPassword: (form) => {
        const { password, confirmPassword } = form.values;

        if (confirmPassword && (confirmPassword !== password)) {
          return 'As senhas devem ser iguais';
        }
      }
    }
  }, []);

  const toggleType = () => { setType(prev => prev === 'text' ? 'password' : 'text'); };

  const goToSignin = () => { navigate('/signin'); };

  return (
    <Slide enter direction="top">
      <Stack
        alignItems="center"
        justifyContent="center"
        style={{ height: '100vh' }}
        sx={{ backgroundColor: ({ background }) => background.paper }}
      >
        <Container sm="100%" md={500} lg={500} sx={{ p: 2 }}>
          <Stack alignItems="center" sx={{ mb: 3 }}>
            <Logo width={250} />
          </Stack>
          <Card>
            <CardContent>
              <Stack gap={8}>
                <Typography variant="body2" color="text.primary">Criar conta</Typography>
                <Form formGroup={formGroup} style={{ width: '100%' }}>
                  <Stack gap={8}>
                    <Control
                      controlName="name"
                      field={(control) => (
                        <Input
                          fullWidth
                          label="Name"
                          placeholder="ex: John Doe"
                          data-cy="name-input"
                          value={control.value}
                          error={control.isInvalid}
                          helperText={control.error}
                        />
                      )}
                    />
                    <Control
                      controlName="email"
                      field={(control) => (
                        <Input
                          fullWidth
                          label="Email"
                          placeholder="ex: john@doe.com"
                          data-cy="email-input"
                          value={control.value}
                          error={control.isInvalid}
                          helperText={control.error}
                        />
                      )}
                    />
                    <Control
                      controlName="password"
                      field={(control) => (
                        <Input
                          fullWidth
                          label="Senha"
                          data-cy="password-input"
                          type={type}
                          value={control.value}
                          error={control.isInvalid}
                          helperText={control.error}
                          endIcon={
                            <ButtonIcon onClick={toggleType}>
                              <Icon name={iconEye} />
                            </ButtonIcon>
                          }
                        />
                      )}
                    />
                    <Control
                      controlName="confirmPassword"
                      field={(control) => (
                        <Input
                          required
                          fullWidth
                          label="Confirmar senha"
                          data-cy="confirm-password-input"
                          type={type}
                          value={control.value}
                          error={control.isInvalid}
                          helperText={control.error}
                        />
                      )}
                    />
                    <Button
                      fullWidth
                      type="submit"
                      size="large"
                      data-cy="signup-submit"
                      disabled={loading}
                      loading={loading && <Loading />}
                    >
                      Criar conta
                    </Button>
                    <Divider />
                    <Stack flexDirection="row" justifyContent="center" alignItems="center">
                      <Typography variant="body2" color="text.primary" style={{ textAlign: 'center' }}>
                        Já possui conta?
                      </Typography>
                      <Button
                        size="small"
                        type="button"
                        variant="text"
                        data-cy="signin-button"
                        onClick={goToSignin}
                      >
                        Entrar
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
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