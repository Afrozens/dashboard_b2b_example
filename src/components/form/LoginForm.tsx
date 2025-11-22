'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import FieldInput from '@/components/commons/field/FieldInput';
import ButtonPrimary from '@/components/commons/buttons/ButtonPrimary';
import useSubmit from '@/hooks/useSubmit';
import AuthService from '@/services/AuthService';
import { SignIn, SignInResponse } from '@/models/auth';
import { regexPassword } from '@/utils/regex';

const LoginForm = () => {
  const authService = new AuthService();
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignIn>({
    mode: 'onChange',
  });
  const { isLoading, doSubmit } = useSubmit<SignIn, SignInResponse>('Sign in was successfully, welcome back');

  const onSubmit: SubmitHandler<SignIn> = async (data) => {
    await doSubmit({ 
        data, 
        callback: authService.loginAuth 
    });
      
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-initial">
      <FieldInput
        label={'email'}
        type="email"
        id="email"
        name="email"
        error={errors.email?.message as string}
        register={register}
        rules={{
          required: {
            value: true,
            message: 'Email is required',
          },
        }}
        isRequired
        placeholder="Correo@example.com"
      />
      <FieldInput
        label={'password'}
        type="password"
        id="password"
        name="password"
        error={errors.password?.message as string}
        register={register}
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
          pattern: {
            value: regexPassword,
            message: 'Password must contain only letters and numbers',
          },
        }}
        isRequired
        placeholder="••••••••••"
      />
      <div className="w-full flex justify-center items-center">
        <ButtonPrimary disabled={!isValid} type="submit" loading={isLoading}>
            Sign In
        </ButtonPrimary>
      </div>
    </form>
  );
};

export default LoginForm;