import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


// ========================================
// MOVIE
// ========================================

export type Movie = {

  id: string;

  title: string;

  genre: string;

  year: number;

  rating: number;

  poster: string;

  isShowing: boolean;

};


// ========================================
// PROPS
// ========================================

type MovieCardProps = {

  movie: Movie;

  layout?: 'row' | 'tile';

  onSelect: (id: string) => void;

};


// ========================================
// MOVIE CARD
// ========================================

const MovieCard = ({

  movie,

  layout = 'row',

  onSelect,

}: MovieCardProps) => {


  const isTile = layout === 'tile';


  // ========================================
  // ẢNH MẶC ĐỊNH
  // ========================================

  const defaultPoster =
    'https://placehold.co/300x450/png?text=Movie';


  // ========================================
  // POSTER
  // ========================================

  const posterUrl =
    movie.poster &&
    movie.poster.startsWith('http')
      ? movie.poster
      : defaultPoster;


  return (

    <TouchableOpacity

      style={[
        styles.card,
        isTile && styles.cardTile,
      ]}

      onPress={() => onSelect(movie.id)}

    >

      {/* ========================================
          POSTER
          ======================================== */}

      <View style={styles.posterContainer}>

        <Image

          source={{
            uri: posterUrl,
          }}

          style={[
            styles.poster,
            isTile && styles.posterTile,
          ]}

          resizeMode="cover"

          onError={() => {

            console.log(
              'Không tải được ảnh:',
              movie.poster
            );

          }}

        />


        {/* ========================================
            RATING TRÊN ẢNH - TILE
            ======================================== */}

        {isTile && (

          <Text style={styles.ratingTile}>

            ⭐ {movie.rating.toFixed(1)}

          </Text>

        )}

      </View>


      {/* ========================================
          INFORMATION
          ======================================== */}

      <View

        style={[
          styles.info,
          isTile && styles.infoTile,
        ]}

      >

        {/* TITLE */}

        <Text

          style={styles.title}

          numberOfLines={1}

        >

          {movie.title}

        </Text>


        {/* ========================================
            GENRE + YEAR
            CHỈ HIỆN ROW
            ======================================== */}

        {!isTile && (

          <>

            <Text style={styles.text}>

              Thể loại: {movie.genre}

            </Text>


            <Text style={styles.text}>

              Năm: {movie.year}

            </Text>

          </>

        )}


        {/* ========================================
            RATING
            CHỈ HIỆN ROW
            ======================================== */}

        {!isTile && (

          <Text style={styles.rating}>

            ⭐ {movie.rating.toFixed(1)}

          </Text>

        )}


        {/* ========================================
            STATUS
            ======================================== */}

        <Text style={styles.status}>

          {movie.isShowing

            ? 'Đang chiếu ✅'

            : 'Ngừng chiếu ❌'

          }

        </Text>

      </View>

    </TouchableOpacity>

  );

};


// ========================================
// EXPORT
// ========================================

export default React.memo(MovieCard);


// ========================================
// STYLE
// ========================================

const styles = StyleSheet.create({

  // ========================================
  // ROW CARD
  // ========================================

  card: {

    flexDirection: 'row',

    backgroundColor: '#eeeeee',

    marginVertical: 6,

    padding: 8,

    borderRadius: 10,

    flex: 1,

  },


  // ========================================
  // TILE CARD
  // ========================================

  cardTile: {
    flexDirection: 'column',
    marginHorizontal: 4,
    marginVertical: 6,
    padding: 0,
    overflow: 'hidden',
    flex: 1,
  },


  // ========================================
  // POSTER CONTAINER
  // ========================================

  posterContainer: {

    position: 'relative',

  },


  // ========================================
  // POSTER ROW
  // ========================================

  poster: {

    width: 70,

    height: 100,

    borderRadius: 6,

    backgroundColor: '#cccccc',

  },


  // ========================================
  // POSTER TILE
  // ========================================

  posterTile: {

    width: '100%',

    height: undefined,

    aspectRatio: 2 / 3,

    borderRadius: 0,

    backgroundColor: '#cccccc',

  },


  // ========================================
  // INFORMATION
  // ========================================

  info: {

    flex: 1,

    marginLeft: 10,

    justifyContent: 'center',

  },


  // ========================================
  // TILE INFORMATION
  // ========================================

  infoTile: {

    marginLeft: 0,

    padding: 8,

  },


  // ========================================
  // TITLE
  // ========================================

  title: {

    fontSize: 17,

    fontWeight: 'bold',

    marginBottom: 5,

  },


  // ========================================
  // GENRE / YEAR
  // ========================================

  text: {

    fontSize: 14,

    marginBottom: 3,

  },


  // ========================================
  // RATING
  // ========================================

  rating: {

    fontSize: 15,

    fontWeight: 'bold',

    marginTop: 3,

  },


  // ========================================
  // RATING TILE
  // ========================================

  ratingTile: {

    position: 'absolute',

    top: 5,

    right: 5,

    backgroundColor: 'white',

    padding: 4,

    borderRadius: 5,

    fontWeight: 'bold',

  },


  // ========================================
  // STATUS
  // ========================================

  status: {

    fontSize: 14,

    marginTop: 4,

  },

});