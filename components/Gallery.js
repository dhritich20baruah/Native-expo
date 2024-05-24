import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { getPhotosByUser } from './database';

const Gallery = () => {
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [photos, setPhotos] = useState([]);
  
  // useEffect(()=>{
  //   const loadPhotos = async () => {
  //     const userPhotos = await getPhotosByUser(userId)
  //     console.log(userPhotos)
  //     setPhotos(userPhotos)
  //   };
  //   loadPhotos();
  // }, [userId])
  useEffect(() => {
    (async () => {      
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
    })();

    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const assets = await MediaLibrary.getAssetsAsync({
      mediaType: 'photo',
      sortBy: MediaLibrary.SortBy.creationTime,
    });
    setPhotos(assets.assets);
  };


  if (hasMediaLibraryPermission === false) {
    return <View><Text>No access to media library</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={styles.photo}
          />
        )}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 1,
  },
});

export default Gallery;
