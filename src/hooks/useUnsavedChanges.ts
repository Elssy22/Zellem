"use client";

import { useEffect, useCallback, useState } from "react";

interface UseUnsavedChangesOptions {
  message?: string;
}

export function useUnsavedChanges(
  hasChanges: boolean,
  options: UseUnsavedChangesOptions = {}
) {
  const {
    message = "Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter cette page ?",
  } = options;

  const [showModal, setShowModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  // Handle browser back/forward and tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges, message]);

  // Function to check before navigating
  const confirmNavigation = useCallback(
    (href: string): boolean => {
      if (hasChanges) {
        setPendingNavigation(href);
        setShowModal(true);
        return false;
      }
      return true;
    },
    [hasChanges]
  );

  // Confirm leaving
  const handleConfirmLeave = useCallback(() => {
    setShowModal(false);
    if (pendingNavigation) {
      window.location.href = pendingNavigation;
    }
  }, [pendingNavigation]);

  // Cancel leaving
  const handleCancelLeave = useCallback(() => {
    setShowModal(false);
    setPendingNavigation(null);
  }, []);

  return {
    showModal,
    confirmNavigation,
    handleConfirmLeave,
    handleCancelLeave,
    message,
  };
}
