export type ModalState = {
  showModal: Record<string, boolean> // An object containing boolean values based on parameter names
  toggleModal: (modalName: string) => void // Function to open or close a modal based on the parameter name
  closeAllModals: () => void // Function to close all modals
}

export type UserState = {
  isAuth: boolean
  setIsAuth: () => void
}
