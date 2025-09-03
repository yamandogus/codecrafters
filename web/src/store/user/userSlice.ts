import { createSlice } from "@reduxjs/toolkit"



export interface UserState {
  username: string
}

// localStorage'dan kullanıcı adını al, yoksa boş string kullan
const getUsernameFromStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUsername = localStorage.getItem('username')
    return storedUsername ? storedUsername : ''
  }
  return ''
}

const initalState = {
    username: getUsernameFromStorage()
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
            // Kullanıcı adını localStorage'a kaydet
            if (typeof window !== 'undefined') {
                localStorage.setItem('username', action.payload)
            }
        },
        deleteUsername: (state) => {
            state.username = ''
            // localStorage'dan kullanıcı adını sil
            if (typeof window !== 'undefined') {
                localStorage.removeItem('username')
            }
        }
    }   
})

// deleteUsername'i de export et
export const { setUsername, deleteUsername } = userSlice.actions

export default userSlice.reducer
