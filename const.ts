export const APP_CONFIG = {
  APP_NAME: 'Flappy Bird',
  APP_VERSION: '1.0.0',
};

export const PHYSICS = {
  GRAVITY: 10, // m/s^2
  JUMP_FORCE: 500, // m/s
  PIPE_SPEED: 5, // m/s
};

export const GameTheme = {
  cityDay: {
    bg: require('@/assets/sprites/background-day.png'),
    bird: require('@/assets/sprites/yellowbird-upflap.png'),
    pipeBottom: require('@/assets/sprites/pipe-green-bottom.png'),
    pipeTop: require('@/assets/sprites/pipe-green-top.png'),
    base: require('@/assets/sprites/base.png'),
  },
  cityNight: {
    bg: require('@/assets/sprites/background-night.png'),
    bird: require('@/assets/sprites/redbird-upflap.png'),
    pipeBottom: require('@/assets/sprites/pipe-red-bottom.png'),
    pipeTop: require('@/assets/sprites/pipe-red-top.png'),
    base: require('@/assets/sprites/base.png'),
  },
};
