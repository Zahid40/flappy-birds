import { Platform, useWindowDimensions } from 'react-native';
import { Canvas, useImage, Image, Group, Text, matchFont } from '@shopify/react-native-skia';
import {
  useSharedValue,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
  useFrameCallback,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedReaction,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { DIMENSION, GameTheme, PHYSICS } from '@/const';

const GameScreen = () => {
  const { width, height } = useWindowDimensions();
  const [score, setScore] = useState(0);

  const theme = { map: GameTheme.map.cityNight, bird: GameTheme.bird.bird_yellow };

  const bg = useImage(theme.map.bg);
  const bird = useImage(theme.bird);
  const pipeBottom = useImage(theme.map.pipeBottom);
  const pipeTop = useImage(theme.map.pipeTop);
  const base = useImage(theme.map.base);

  const gameOver = useSharedValue(false);
  const pipeX = useSharedValue(width);

  const birdY = useSharedValue(height / 3);
  const birdX = width / 4;
  const birdYVelocity = useSharedValue(0);

  const pipeOffset = useSharedValue(0);
  const topPipeY = useDerivedValue(() => pipeOffset.value - 320);
  const bottomPipeY = useDerivedValue(() => height - 320 + pipeOffset.value);

  const pipesSpeed = useDerivedValue(() => {
    return interpolate(score, [0, 20], [1, 2]);
  });

  const obstacles = useDerivedValue(() => [
    // bottom pipe
    {
      x: pipeX.value,
      y: bottomPipeY.value,
      h: DIMENSION.PIPE.height,
      w: DIMENSION.PIPE.width,
    },
    // top pipe
    {
      x: pipeX.value,
      y: topPipeY.value,
      h: DIMENSION.PIPE.height,
      w: DIMENSION.PIPE.width,
    },
  ]);

  useEffect(() => {
    moveTheMap();
  }, []);

  const moveTheMap = () => {
    pipeX.value = withSequence(
      withTiming(width, { duration: 0 }),
      withTiming(-150, {
        duration: 3000 / pipesSpeed.value,
        easing: Easing.linear,
      }),
      withTiming(width, { duration: 0 })
    );
  };

  // Scoring system
  useAnimatedReaction(
    () => pipeX.value,
    (currentValue, previousValue) => {
      const middle = birdX;

      // change offset for the position of the next gap
      if (previousValue && currentValue < -100 && previousValue > -100) {
        pipeOffset.value = Math.random() * 400 - 200;
        cancelAnimation(pipeX);
        runOnJS(moveTheMap)();
      }

      if (
        currentValue !== previousValue &&
        previousValue &&
        currentValue <= middle &&
        previousValue > middle
      ) {
        // do something ✨
        runOnJS(setScore)(score + 1);
      }
    }
  );

  const isPointCollidingWithRect = (point, rect) => {
    'worklet';
    return (
      point.x >= rect.x && // right of the left edge AND
      point.x <= rect.x + rect.w && // left of the right edge AND
      point.y >= rect.y && // below the top AND
      point.y <= rect.y + rect.h // above the bottom
    );
  };

  // Collision detection
  useAnimatedReaction(
    () => birdY.value,
    (currentValue, previousValue) => {
      const center = {
        x: birdX + 32,
        y: birdY.value + 24,
      };

      // Ground collision detection
      if (currentValue > height - 100 || currentValue < 0) {
        gameOver.value = true;
      }

      const isColliding = obstacles.value.some((rect) => isPointCollidingWithRect(center, rect));
      if (isColliding) {
        gameOver.value = true;
      }
    }
  );

  useAnimatedReaction(
    () => gameOver.value,
    (currentValue, previousValue) => {
      if (currentValue && !previousValue) {
        cancelAnimation(pipeX);
      }
    }
  );

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt || gameOver.value) {
      return;
    }
    birdY.value = birdY.value + (birdYVelocity.value * dt) / 1000;
    birdYVelocity.value = birdYVelocity.value + (PHYSICS.GRAVITY * 100 * dt) / 1000;
  });

  const restartGame = () => {
    'worklet';
    birdY.value = height / 3;
    birdYVelocity.value = 0;
    gameOver.value = false;
    pipeX.value = width;
    runOnJS(moveTheMap)();
    runOnJS(setScore)(0);
  };

  const gesture = Gesture.Tap().onStart(() => {
    if (gameOver.value) {
      // restart
      restartGame();
    } else {
      // jump
      birdYVelocity.value = -PHYSICS.JUMP_FORCE;
    }
  });

  const birdTransform = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(birdYVelocity.value, [-500, 500], [-0.5, 0.5], Extrapolation.CLAMP),
      },
    ];
  });
  const birdOrigin = useDerivedValue(() => {
    return { x: width / 4 + 32, y: birdY.value + 24 };
  });

  const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' });
  const fontStyle = {
    fontFamily,
    fontSize: 40,
    fontWeight: 'bold',
  };
  const font = matchFont(fontStyle);

  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={{ width, height }}>
        {/* BG */}
        <Image image={bg} width={width} height={height} fit={'cover'} />

        {/* Pipes */}
        <Image
          image={pipeTop}
          y={topPipeY}
          x={pipeX}
          width={DIMENSION.PIPE.width}
          height={DIMENSION.PIPE.height}
        />
        <Image
          image={pipeBottom}
          y={bottomPipeY}
          x={pipeX}
          width={DIMENSION.PIPE.width}
          height={DIMENSION.PIPE.height}
        />

        {/* Base */}
        <Image
          image={base}
          width={width}
          height={DIMENSION.BASE.height}
          y={height - 75}
          x={0}
          fit={'cover'}
        />

        {/* Bird */}
        <Group transform={birdTransform} origin={birdOrigin}>
          <Text
            y={birdY}
            x={birdX}
            text={'LegendX'}
            font={matchFont({
              fontFamily: 'serif',
              fontSize: 12,
              fontWeight: '900',
            })}
          />
          <Image
            image={bird}
            y={birdY}
            x={birdX}
            width={DIMENSION.BIRD.width}
            height={DIMENSION.BIRD.height}
          />
        </Group>

        {/* Sim */}

        {/* Score */}
        <Text x={width / 2 - 30} y={100} text={score.toString()} font={font} />
      </Canvas>
    </GestureDetector>
  );
};
export default GameScreen;
