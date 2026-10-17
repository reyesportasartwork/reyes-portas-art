import { useEffect, useRef } from 'react';

interface UseGlobalGalleryKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Global keyboard event listener hook for gallery modal interactions.
 * - 'Escape': Closes the modal
 * - 'ArrowRight': Navigates to the next artwork
 * - 'ArrowLeft': Navigates to the previous artwork
 * 
 * Uses capture-phase window listener to ensure consistent event handling
 * across all gallery views, regardless of inner focus state.
 */
export const useGlobalGalleryKeyboard = ({
  isOpen,
  onClose,
  onNext,
  onPrev,
}: UseGlobalGalleryKeyboardProps) => {
  // Use latest ref callbacks to prevent unnecessary listener re-attachments
  const handlersRef = useRef({ onClose, onNext, onPrev });
  useEffect(() => {
    handlersRef.current = { onClose, onNext, onPrev };
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Don't intercept if user is typing in a form input or textarea
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          event.stopPropagation();
          handlersRef.current.onClose();
          break;

        case 'ArrowRight':
        case 'Right': // Older browsers compatibility
          event.preventDefault();
          event.stopPropagation();
          handlersRef.current.onNext();
          break;

        case 'ArrowLeft':
        case 'Left': // Older browsers compatibility
          event.preventDefault();
          event.stopPropagation();
          handlersRef.current.onPrev();
          break;

        default:
          break;
      }
    };

    // Attach to window with capture phase to guarantee interception across views
    window.addEventListener('keydown', handleGlobalKeyDown, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown, { capture: true });
    };
  }, [isOpen]);
};
