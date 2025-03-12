import React, {useState} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {parse, STR, OBJ} from 'partial-json';

import {askTogetherAI} from '../../utils/genaral';
import {styles} from './style';
import {setLatestItinerary} from './latestItinerarySlice';

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  data?: ItineraryData;
}

interface ItineraryData {
  tripName: string;
  startLocation: {name: string; latitude: number; longitude: number};
  endLocation: {name: string; latitude: number; longitude: number};
  stops: {
    location: {name: string; latitude: number; longitude: number};
    duration: string;
  }[];
}

const ChatScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>(
    'Create a trip plan from coimbatore to Hyderabad include stops in bangalore and chennai.',
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const isTripPlanQuery = /trip plan|itinerary/i.test(input);

    const aiReply = await askTogetherAI(input, isTripPlanQuery);

    console.log('aiReply', aiReply);

    let aiMessage: ChatMessage;
    try {
      if (isTripPlanQuery) {
        const parsedResponse = parse(aiReply, STR | OBJ);
        console.log('parsedResponse', parsedResponse);
        if (parsedResponse.itinerary) {
          dispatch(setLatestItinerary(parsedResponse.itinerary));
          aiMessage = {
            id: Date.now() + 1,
            text: parsedResponse.responseText,
            sender: 'ai',
            data: parsedResponse.itinerary,
          };
        }
      } else {
        aiMessage = {id: Date.now() + 1, text: aiReply, sender: 'ai'};
      }
    } catch (error) {
      console.log('error while parsing', error);
      aiMessage = {id: Date.now() + 1, text: aiReply, sender: 'ai'};
    }

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  console.log('messages', messages);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View
            style={[
              styles.message,
              item.sender === 'user' ? styles.userMessage : styles.aiMessage,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>

            {/* Show Itinerary If Available */}
            {item.data && (
              <View style={styles.itineraryContainer}>
                <Text style={styles.itineraryTitle}>📍 {item.text}</Text>
                <View style={styles.itineraryItem}>
                  <Text style={styles.itineraryText}>
                    Start: {item.data?.startLocation?.name}
                  </Text>
                </View>
                {item.data?.stops.map((stop, index) => (
                  <View key={index} style={styles.itineraryItem}>
                    <Text style={styles.itineraryText}>
                      {stop.location.name} - {stop.duration}
                    </Text>
                  </View>
                ))}
                <View style={styles.itineraryItem}>
                  <Text style={styles.itineraryText}>
                    End: {item.data?.endLocation.name}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      />

      {loading && <Text style={styles.loadingText}>AI is typing...</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your trip..."
        />
        <Button title="Send" onPress={handleSend} disabled={loading} />
      </View>
    </View>
  );
};

export default ChatScreen;
