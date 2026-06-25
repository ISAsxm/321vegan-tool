import LoginForm from "@/features/authentication/LoginForm";
import AuthLayout from "@/ui/AuthLayout";
import Logo from "@/ui/Logo";
import Heading from "@/ui/Heading";

function Login() {
  return (
    <AuthLayout>
      <Logo />
      <Heading as="h4">Connectez-vous à votre compte</Heading>
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
