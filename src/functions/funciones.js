import axios from "axios";
const askAI = async (question) => {
    const options = {
        method: 'POST',
        url: 'https://api.cohere.ai/generate',
        headers: {
            'accept': 'application/json',
            'Cohere-Version': '2022-12-06',
            'content-type': 'application/json',
            'authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        data: {
            model:'command-xlarge-20221108',
            prompt: question,
            max_tokens: 252,
            temperature: 0.8,
            k: 0,
            p: 0.75,
            frequency_penalty: 0.2,
            presence_penalty: 0.2,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        }
    };

    // return axios.request(options).then(function (response) {

    //     
    // }).catch(function (error) {
    //     console.error(error);
    // });

    const response = await axios.request(options)
    const { text } = response.data.generations[0];
    return text;
}

export {
    askAI
}