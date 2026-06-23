import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import type { ComponentProps } from 'react';
import { Platform } from 'react-native';

export function ExternalLink({ href, ...rest }: Omit<ComponentProps<typeof Link>, 'href'> & { href: string }) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href as any}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          e.preventDefault();
          WebBrowser.openBrowserAsync(href);
        }
      }}
    />
  );
}
