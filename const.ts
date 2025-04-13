export const APP_CONFIG = {
  APP_NAME: 'Flappy Bird',
  APP_VERSION: '1.0.0',
};

export const PHYSICS = {
  GRAVITY: 10, // m/s^2
  JUMP_FORCE: 500, // m/s
  PIPE_SPEED: 5, // m/s
  
};

export const DIMENSION = {
  BIRD: {
    width: 64,
    height: 48,
  },
  BASE :{
    height: 112,
  },
  PIPE :{
    width: 104,
    height: 640,
  }
}

export const GameTheme = {
  bird: {
    bird_yellow: require('@/assets/sprites/yellowbird-upflap.png'),
    bird_red: require('@/assets/sprites/redbird-upflap.png'),
    bird_blue: require('@/assets/sprites/bluebird-upflap.png'),
  },
  map: {
    cityDay: {
      bg: require('@/assets/sprites/background-day.png'),
      pipeBottom: require('@/assets/sprites/pipe-green-bottom.png'),
      pipeTop: require('@/assets/sprites/pipe-green-top.png'),
      base: require('@/assets/sprites/base.png'),
    },
    cityNight: {
      bg: require('@/assets/sprites/background-night.png'),
      pipeBottom: require('@/assets/sprites/pipe-red-bottom.png'),
      pipeTop: require('@/assets/sprites/pipe-red-top.png'),
      base: require('@/assets/sprites/base.png'),
    },
  },
};
