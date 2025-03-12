import axios from 'axios';

const TOGETHER_AI_KEY =
  'c9dd540ad80d7a51333272e65a71feb1292275d1619ed9c49ff6081f32ad97ef';

export const askTogetherAI = async (message: string, isTripPlanQuery?: boolean): Promise<string> => {

    const formattedMessage = {
        'responseText': 'Short summary of the itinerary',
        'itinerary': {
            'tripName': 'Trip Name less than 10 words',
            'tripDescription': 'endLocation Description less than 20 words',
            'tripCoverImage': 'Image URL of a famous landmark in the trip',
            'startDate': 'Start Date',
            'startLocation': {
                'name': 'City Name',
                'latitude': 0.0,
                'longitude': 0.0,
            },
            'endLocation': {
                'name': 'City Name',
                'latitude': 0.0,
                'longitude': 0.0,
            },
            'stops': [
                {
                    'location': {
                        'name': 'Stop Name',
                        'latitude': 0.0,
                        'longitude': 0.0,
                    },
                    'duration': 'Time spent at stop',
                },
            ],
        },
    };

    const systemPrompt = isTripPlanQuery
      ? `You are a travel planner. Provide a detailed JSON response containing an itinerary with locations and coordinates. Generate only a JSON object with the following format, ${JSON.stringify(formattedMessage)}. do not include any extra text. Return only the JSON object. Suggest stops even if the user has not mentioned them. ensure that number of stops is less than 5.`
      : 'You are a helpful travel assistant.';
  try {
    const response = await axios.post(
      'https://api.together.ai/v1/chat/completions',
      {
        model: 'mistralai/Mistral-7B-Instruct-v0.1',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_AI_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const aiText = response.data.choices[0]?.message?.content || '{}';
    return aiText;

} catch (error: any) {
    return 'Error fetching AI response.';
  }
};


export const getFormattedDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}_${month}_${year}`;
};

export const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
};

export const isNonEmptyObject = (obj: unknown) => obj && Object.keys(obj).length > 0;
