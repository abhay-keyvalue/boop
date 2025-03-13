import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {parse, STR, OBJ} from 'partial-json';

import {askTogetherAI, formatTime, getFormattedDate} from '../../utils/genaral';
import {styles} from './style';
import {resetLatestItinerary, setLatestItinerary} from './latestItinerarySlice';
import {addNewMessage, resetMessages} from './messageSlice';
import {ChatMessage, Media} from '../../types';
import {addImages, resetImages} from './albumSlice';
import {navigateTo} from '../../navigation/navigationUtils';
import Send from '../../assets/svg/send.svg';
import Reset from '../../assets/svg/resetChat.svg';
import ImageUpload from '../../assets/svg/imageUpload.svg';

const ChatScreen: React.FC = () => {
  const flatListRef = React.useRef<FlatList | null>(null);
  const dispatch = useDispatch();
  const {messages} = useSelector(
    (state: {messageList: {messages: ChatMessage[]}}) => state.messageList,
  );

  const [input, setInput] = useState<string>(
    'Hey Boop, I am planning a trip',
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<Media[]>([]);

  useEffect(() => {
    console.log('[LOG: New message added]:', messages);
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (flatListRef?.current && messages?.length > 2) {
        flatListRef?.current?.scrollToIndex({index: messages?.length - 1});
      }
    }, 0);
  };

  const handleSend = async () => {
    if (!input.trim() && selectedImages.length === 0) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      medias: selectedImages,
      timestamp: Date.now(),
    };
    dispatch(addNewMessage(userMessage));
    if (selectedImages.length > 0) {
      dispatch(
        addImages({
          album: getFormattedDate(Date.now()),
          images: selectedImages,
        }),
      );
    }

    setInput('');
    setSelectedImages([]);

    if (input?.trim()?.length > 0) {
      setLoading(true);
      const isTripPlanQuery = /trip plan|itinerary|planning a trip/i.test(input);
      const aiReply = await askTogetherAI(input, isTripPlanQuery);
      let aiMessage: ChatMessage = {
        id: Date.now() + 1,
        text: aiReply,
        sender: 'ai',
        timestamp: Date.now(),
      };
      try {
        if (isTripPlanQuery) {
          const parsedResponse = parse(aiReply, STR | OBJ);
          if (parsedResponse.itinerary) {
            dispatch(setLatestItinerary(parsedResponse.itinerary));
            aiMessage = {
              id: Date.now() + 1,
              text: parsedResponse.responseText,
              sender: 'ai',
              data: parsedResponse.itinerary,
              timestamp: Date.now(),
            };
          }
        }
      } catch (error) {
        console.log('error while parsing', error);
      }

      dispatch(addNewMessage(aiMessage));
      setLoading(false);
    }

    scrollToBottom();
  };

  const openImagePicker = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 5}, response => {
      if (response.assets) {
        const images = response?.assets?.map(asset => ({
          uri: asset.uri || '',
          name: asset.fileName || '',
          date: new Date().toISOString(),
          album: getFormattedDate(Date.now()),
        }));
        setSelectedImages(images);
      }
    });
  };

  const clearChat = () => {
    dispatch(resetMessages());
    dispatch(resetImages());
    dispatch(resetLatestItinerary());
  };

  const navigateToMapScreen = () => {
    navigateTo('Map');
  };

  const renderSelectedImages = () => {
    if (selectedImages.length === 0) {
      return null;
    }

    return (
      <View style={styles.selectedImagesContainer}>
        <Text style={styles.closeButton} onPress={() => setSelectedImages([])}>
          ❌
        </Text>
        {selectedImages.map((image, index) => (
          <Image
            key={index}
            source={{uri: image.uri}}
            style={styles.selectedImage}
          />
        ))}
      </View>
    );
  };

  const renderMessageBubble = (item: ChatMessage) => {
    return (
      <>
        {renderItineraryCard(item)}
        <View
          style={[
            styles.message,
            item.sender === 'user' ? styles.userMessage : styles.aiMessage,
          ]}>
          <Text style={styles.messageText}>{item.text}</Text>
          {renderImages(item.medias)}
          {renderTimestamp(item?.timestamp)}
        </View>
      </>
    );
  };

  const renderTimestamp = (timestamp?: number) => {
    return (
      <Text style={styles.timestamp}>
        {timestamp ? formatTime(timestamp) : '00:00 AM'}
      </Text>
    );
  };

  const renderImages = (medias?: Media[]) => {
    const totalImages = medias?.length || 0;
    if (totalImages === 0) {
      return null;
    }

    return (
      <View style={styles.mediaContainer}>
        {medias?.map((media, index) => (
          <Image
            key={index}
            source={{uri: media.uri}}
            style={
              totalImages === 1
                ? styles.chatImage
                : totalImages % 2 === 1 && totalImages === index + 1
                ? styles.chatImage3
                : styles.chatImage2
            }
          />
        ))}
      </View>
    );
  };

  const renderItineraryCard = (item: ChatMessage) => {
    if (!item.data) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={navigateToMapScreen}
        style={styles.itineraryContainer}>
        <View style={styles.itineraryItem}>
          <View style={styles.itineraryImageContainer}>
            <Image
              source={{uri: item.data?.tripCoverImage}}
              style={styles.itineraryImage}
            />
          </View>
          <View style={styles.itineraryContent}>
            <Text style={styles.itineraryTitle}>{item.text}</Text>
            <Text style={styles.itineraryText}>
              {item.data?.tripDescription}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderListEmptyComponent = () => {
    return (
      <View style={styles.emptyChatContainer}>
        <Text style={styles.emptyChatText}>No messages yet</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 55 : 0}
      >
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Travel Assistant</Text>
        <TouchableOpacity style={styles.clear} onPress={clearChat}>
          <Reset />
        </TouchableOpacity>
      </View>
      <View style={styles.messageContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderMessageBubble(item)}
          ListEmptyComponent={renderListEmptyComponent}
        />
      </View>

      {loading && <Text style={styles.loadingText}>AI is typing...</Text>}

      {renderSelectedImages()}

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={openImagePicker}
          style={styles.imagePickerButton}>
          <ImageUpload />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={input}
          placeholderTextColor={'#aaa'}
          multiline
          numberOfLines={3}
          onChangeText={setInput}
          placeholder="Ask about your trip..."
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={loading}
          style={styles.sendButton}>
          <Send width={30} height={30} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
