'use server'

import Client from 'opperai'
const client = new Client()

const INDEX_NAME = 'node-holm-hr-bot'

export const getQueryResponse = async (query: string) => {
    const index = await client.indexes.get(INDEX_NAME)
    // 1. Call the retrieval function to get relevant documents

    if (!index) { throw new Error(`Index ${INDEX_NAME} not found`) }

    const knowledge_base = await index.query({
        query: "What paragraphs are relevant to the question: " + query,
        k: 4
    })

    // 2. Call the LLM with the message and the retrieved documents
    const response = await client.call({
        name: 'node-holm-hr-bot-question',
        model: 'openai/gpt-4o-mini',
        instructions: "You're a helpful HR assistant, working at a digital healthcare company called Mindler. Use a tone that is friendly and professional, and answer as briefly as possible. The user asking questions is a psychologist at Mindler, working digitally with mental health therapy. If you're unsure of the answer, let the user know. Answer the question using the knowledge",
        input: {
            question: query,
            knowledge: knowledge_base
        }
    })
    
    // 3. Return the bot response.
    return response
}