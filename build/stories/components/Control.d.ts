import React from 'react';
export declare const CONTROL_HEIGHT = 100;
interface ControlProps {
    onNext: () => void;
    onPrev: () => void;
    onToday: () => void;
}
export declare function Control({ onNext, onPrev, onToday }: ControlProps): React.JSX.Element;
export {};
