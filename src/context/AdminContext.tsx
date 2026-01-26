"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getPocketBase } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AdminContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pb = getPocketBase();

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const checkAuth = () => {
      if (pb.authStore.isValid && pb.authStore.record) {
        setUser({
          id: pb.authStore.record.id,
          email: pb.authStore.record.email || "",
          name: pb.authStore.record.name || pb.authStore.record.email || "",
          avatar: pb.authStore.record.avatar || undefined,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Écouter les changements d'auth
    pb.authStore.onChange(() => {
      checkAuth();
    });
  }, [pb]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const authData = await pb.collection("users").authWithPassword(email, password);

      setUser({
        id: authData.record.id,
        email: authData.record.email || "",
        name: authData.record.name || authData.record.email || "",
        avatar: authData.record.avatar || undefined,
      });

      return true;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return false;
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
