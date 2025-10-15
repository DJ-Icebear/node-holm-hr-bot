'use server'

import { getQueryResponse } from "./index_service"

export const handleMessage = async (message: string) => {
    // 1. Call a server with the user message.
    const response = await getQueryResponse(message)

    // 2. Handle some errors.
    if (response.error) { throw new Error(response.error) }

    // 3. Return the bot response.
    return response.message
}