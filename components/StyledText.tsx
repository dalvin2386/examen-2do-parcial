import { Text, TextProps } from './Themed';

export function MonoText({ style, ...rest }: TextProps) {
  return <Text {...rest} style={[style, { fontFamily: 'SpaceMono' }]} />;
}
