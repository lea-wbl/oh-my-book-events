"use client";

import { FC } from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Es-tu sûr de vouloir supprimer ceci ?",
  confirmText = "Supprimer",
  cancelText = "Annuler",
}) => {
  if (!isOpen) return null; // Prevent rendering when not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded font-semibold hover:bg-white border-2 border-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:text-red-600 hover:bg-white border-2 border-red-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
