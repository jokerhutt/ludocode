import { useCallback, useState } from "react";

export type UseModalReturn = {
    modalOpen: boolean,
    openModal: () => void;
    closeModal: () => void;
}

export function useModal(): UseModalReturn {

    const [modalOpen, setModalOpen] = useState(false)

    const openModal = useCallback(() => setModalOpen(true), [])
    const closeModal = useCallback(() => setModalOpen(false), [])

    return {
        modalOpen,
        openModal,
        closeModal
    }

}