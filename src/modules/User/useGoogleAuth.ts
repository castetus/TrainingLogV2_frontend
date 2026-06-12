import { authService } from "@/api/auth/auth";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useGoogleAuth = () => {

  const authStore = useAuthStore();
  const navigate = useNavigate();

  const openGoogleWindow = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      'google-login',
      'width=500,height=700'
    );
  };

  useEffect(() => {
    const handler = async (event: MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_API_URL) return;
      if (event.data?.type !== 'GOOGLE_AUTH_SUCCESS') return;
  
      const user = await authService.getMe();
  
      useAuthStore.getState().setUser(user);
  
      navigate('/');
    };
  
    window.addEventListener('message', handler);
  
    return () => {
      window.removeEventListener('message', handler);
    };
  }, [navigate]);

  return {
    openGoogleWindow,
  };
};