import { Canvas, Image, useImage } from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

const App = () => {
  const { width, height } = useWindowDimensions();
  const bg = useImage(require('../assets/sprites/background-day.png'));
  const bird = useImage(require('../assets/sprites/yellowbird-upflap.png'));
  const pipeBottom = useImage(require('../assets/sprites/pipe-green-bottom.png'));
  const pipeTop = useImage(require('../assets/sprites/pipe-green-top.png'));
  const base = useImage(require('../assets/sprites/base.png'));

  const x = useSharedValue(width - 50);
  const y = useSharedValue(0);

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(-200, { duration: 2000, easing: Easing.linear }),
        withTiming(width, { duration: 0 })
      ) , -1
    );
  }, []);

  const pipeOffset = 50;
  return (
    <Canvas style={{ width, height }}>
      <Image image={bg} width={width} height={height} fit={'cover'} />
      <Image image={bird} width={64} height={48} x={123} y={height / 2} fit={'contain'} />
      <Image image={pipeTop} width={104} height={640} x={x} y={pipeOffset - 320} fit={'contain'} />
      <Image
        image={pipeBottom}
        width={104}
        height={640}
        x={x}
        y={height - 320 + pipeOffset}
        fit={'contain'}
      />
      <Image image={base} width={width} height={100} x={0} y={height - 75} fit={'cover'} />
    </Canvas>
  );
};

export default App;
