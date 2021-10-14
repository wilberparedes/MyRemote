import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Portal, Dialog} from 'react-native-paper';
import {
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {IconButtonMyIntelli} from '.';

const PhotoSrcCurrentFemale =
  '../../assets/photo_client/icon_person_female.png';
const PhotoSrcCurrentMale = '../../assets/photo_client/icon_person_male.png';

const AvatarMyIntelli = ({
  size,
  recapturePhoto = false,
  onRepcaturePhoto = () => {},
  url = null,
  user: User,
}) => {
  if (!User) {
    return null;
  }

  const [visible, setVisible] = useState(false);

  const img = url
    ? {uri: url}
    : User.person.gender === 2
    ? require(PhotoSrcCurrentFemale)
    : require(PhotoSrcCurrentMale);

  return (
    <>
      <TouchableOpacity onPress={() => url && setVisible(true)}>
        <Image
          source={img}
          style={{
            width: size,
            height: size,
          }}
          fadeDuration={0}
          resizeMode={url ? 'cover' : 'center'}
        />
      </TouchableOpacity>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <View style={styles.containerModal}>
            <IconButtonMyIntelli
              icon={'times'}
              color={'black'}
              size={22}
              style={styles.close}
              onPress={() => setVisible(false)}
            />
            {recapturePhoto && (
              <IconButtonMyIntelli
                icon={'camera'}
                color={'black'}
                size={20}
                style={styles.recapture}
                onPress={() => {
                  onRepcaturePhoto();
                  setVisible(false);
                }}
              />
            )}
            <Image
              source={img}
              style={{
                width: undefined,
                height: heightPercentageToDP(80),
              }}
              fadeDuration={0}
              resizeMode={url ? 'cover' : 'center'}
            />
          </View>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    paddingHorizontal: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  close: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 30,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  recapture: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    bottom: 0,
    left: heightPercentageToDP(17),
    zIndex: 2,
  },
});

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(AvatarMyIntelli);
