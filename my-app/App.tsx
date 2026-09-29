import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Switch,
  RefreshControl,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MovieCard, {
  Movie,
} from './components/Moviecard';


// ========================================
// API MOCKAROO
// ========================================

const API_URL =
  'https://my.api.mockaroo.com/thang.json?key=14b59890';


// ========================================
// APP
// ========================================

export default function App() {

  // ========================================
  // STATE
  // ========================================

  const [movies, setMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [isTile, setIsTile] = useState(false);


  // ========================================
  // GET MOVIES
  // ========================================

  const getMovies = async () => {

    try {

      const response = await fetch(API_URL);

      console.log('STATUS:', response.status);

      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status}`
        );
      }


      // Mockaroo đang trả CSV
      const text = await response.text();

      console.log('API DATA:', text);


      // Tách từng dòng
      const lines = text
        .trim()
        .split('\n');


      // Bỏ dòng header
      const data: Movie[] = lines
        .slice(1)
        .map((line) => {

          const values = line.split(',');

          return {

            id: values[0],

            title: values[1],

            genre: values[2],

            year: Number(values[3]),

            rating: Number(values[4]),

            poster: values[5],

            isShowing:
              values[6]?.trim() === 'true',

          };

        });


      console.log('MOVIES:', data);


      // Lưu dữ liệu
      setMovies(data);


    } catch (error) {

      console.log('ERROR:', error);

      Alert.alert(
        'Lỗi',
        'Không thể tải dữ liệu phim'
      );

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  };


  // ========================================
  // LOAD DATA
  // ========================================

  useEffect(() => {

    getMovies();

  }, []);


  // ========================================
  // REFRESH
  // ========================================

  const onRefresh = () => {

    setRefreshing(true);

    getMovies();

  };


  // ========================================
  // SELECT MOVIE
  // ========================================

  const handleSelect = (id: string) => {

    Alert.alert(
      'Movie được chọn',
      `Bạn đã chọn movie có ID: ${id}`
    );

  };


  // ========================================
  // NUMBER OF COLUMNS
  // ========================================

  const numColumns = isTile ? 2 : 1;


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <SafeAreaProvider>

        <SafeAreaView
          style={styles.safeArea}
        >

          <ActivityIndicator
            size="large"
          />

          <Text
            style={styles.loadingText}
          >
            Đang tải dữ liệu...
          </Text>

        </SafeAreaView>

      </SafeAreaProvider>

    );

  }


  // ========================================
  // MAIN SCREEN
  // ========================================

  return (

    <SafeAreaProvider>

      <SafeAreaView
        style={styles.safeArea}
      >

        {/* HEADER */}

        <View style={styles.header}>

          <Text
            style={styles.headerTitle}
          >
            Movie App
          </Text>


          <View
            style={styles.switchBox}
          >

            <Text>
              Dạng lưới
            </Text>

            <Switch
              value={isTile}
              onValueChange={setIsTile}
            />

          </View>

        </View>


        {/* MOVIE LIST */}

        <FlatList
  key={String(numColumns)}
  data={movies}
  numColumns={numColumns}
  keyExtractor={(item) => item.id}

  renderItem={({ item }) => (
    <MovieCard
      movie={item}
      layout={isTile ? 'tile' : 'row'}
      onSelect={handleSelect}
    />
  )}

  columnWrapperStyle={
    isTile
      ? styles.columnWrapper
      : undefined
  }

  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }

  contentContainerStyle={styles.list}
/>

      </SafeAreaView>

    </SafeAreaProvider>

  );

}


// ========================================
// STYLE
// ========================================

const styles = StyleSheet.create({

  safeArea: {

    flex: 1,

    backgroundColor: '#ffffff',

  },


  header: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 15,

    paddingVertical: 10,

  },


  headerTitle: {

    fontSize: 24,

    fontWeight: 'bold',

  },


  switchBox: {

    flexDirection: 'row',

    alignItems: 'center',

  },


  list: {
    paddingHorizontal: 8,
  },
  
  columnWrapper: {
    justifyContent: 'space-between',
  },


  loadingText: {

    textAlign: 'center',

    marginTop: 10,

  },

});