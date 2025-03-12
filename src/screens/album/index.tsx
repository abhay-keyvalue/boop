import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { styles } from './style';
import { useSelector } from 'react-redux';
import { Media } from '../../types';
import { isNonEmptyObject } from '../../utils/genaral';

interface ImageItem {
  uri: string;
  name: string;
  date: string;
  album: string;
}

const AlbumScreen = () => {
  const {album} = useSelector(
    (state: {album: {album: Media[]}}) => state.album,
  );

  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const [isViewerVisible, setIsViewerVisible] = useState(false);

  const albums = Object.keys(album);

  const openAlbum = (albumKey: string) => {
    setSelectedImages(album[albumKey]);
    setIsViewerVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Memory capture</Text>
      </View>
      {!isNonEmptyObject(album) ? (
        <Text style={styles.noAlbumsText}>No albums found</Text>
      ) : (
        <FlatList
          data={albums}
          keyExtractor={(item) => item}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.albumContainer}
              onPress={() => openAlbum(item)}
            >
              <Image
                source={{ uri: album[item][0]?.uri || '' }}
                style={styles.albumImage}
              />
              <Text style={styles.albumTitle}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <ImageViewing
        images={selectedImages?.map((img) => ({ uri: img.uri }))}
        imageIndex={0}
        visible={isViewerVisible}
        onRequestClose={() => setIsViewerVisible(false)}
      />
    </View>
  );
};

export default AlbumScreen;
