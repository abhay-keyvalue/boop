import axios from 'axios';

const TOGETHER_AI_KEY =
  'c9dd540ad80d7a51333272e65a71feb1292275d1619ed9c49ff6081f32ad97ef';

export const askTogetherAI = async (message: string, isTripPlanQuery?: boolean): Promise<string> => {

    const formattedMessage = {
        'responseText': 'Short summary of the itinerary',
        'itinerary': {
            'tripName': 'Trip Name',
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
      ? `You are a travel planner. Provide a detailed JSON response containing an itinerary with locations and coordinates. Generate only a JSON object with the following format, ${JSON.stringify(formattedMessage)}. do not include any extra text`
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

    console.log('Together AI Response:', aiText);

    return aiText;

} catch (error: any) {
    console.error('Together AI Error:', error.response?.data || error.message);
    return 'Error fetching AI response.';
  }
};

export interface AIResponse {
  response: string;
  itineraryLocations?: {
    id: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
  }[];
}
