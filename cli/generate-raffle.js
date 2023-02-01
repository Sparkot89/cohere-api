
import cohere from 'cohere-ai';
import dontenv from '../src/env.js';
const apiKey = process.env.REACT_APP_API_KEY




cohere.init(apiKey);
const response = await cohere.generate({
  model: 'command-xlarge-20221108',
  prompt: "Given a serie of participants, tell me who is the winner",
  max_tokens: 10, 
  temperature: 0, 
  k: 0, 
  p: 1, 
  frequency_penalty: 0, 
  presence_penalty: 0, 
  stop_sequences: [], 
  return_likelihoods: 'NONE' 
});

console.log(`Ganador!!!: ${response.body.generations[0].text}`);