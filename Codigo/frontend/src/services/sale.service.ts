import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const finalizeSale = async (token: string | null): Promise<void> => {
  await axios.post(
    `${API_URL}/sales`,
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  )
}
