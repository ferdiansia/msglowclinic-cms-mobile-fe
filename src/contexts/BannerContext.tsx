import { createContext, FC, useCallback, useState } from "react";
type BannerContext = {
    openModalForm: () => void
    closeModalForm: () => void
    modalForm: boolean

}

export const BannerContext = createContext<BannerContext>({} as BannerContext)

export const BannerProvider: FC = ({ children }) => {

    const [modalForm, setModalForm] = useState(false)

    const openModalForm = useCallback(() => {
        setModalForm(true)
    }, [])
    const closeModalForm = useCallback(() => {
        setModalForm(false)
    }, [])
    return (
        <BannerContext.Provider value={{
            modalForm,
            openModalForm,
            closeModalForm

        }}>
            {children}
        </BannerContext.Provider>
    )
}