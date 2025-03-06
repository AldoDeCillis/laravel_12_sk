import { HTMLAttributes } from 'react';

export default function AppLogoIcon(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img
            alt="App Logo"
            className="h-full w-full object-cover"
            src="https://picsum.photos/200/200"
            {...props}
        />
    );
}
