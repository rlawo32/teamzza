
import React, {useCallback, useEffect, useRef} from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';

export default function FixedConfettiEffect() {
    const refAnimationInstance = useRef<any>(null);

    const getInstance = useCallback((instance:any) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio:number, opts:Object) => {
        refAnimationInstance.current &&
        refAnimationInstance.current({
            ...opts,
            origin: { x:0.5, y: 0.5 },
            particleCount: Math.floor(200 * particleRatio)
        });
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => fire(), []);

    const fire = useCallback(() => {
        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8, 
            gravity: 0.8,  
            ticks: 200 
        });

        makeShot(0.3, { 
            spread: 120, 
            startVelocity: 25, 
            decay: 0.92, 
            scalar: 1.2,
            gravity: 0.4,  
            ticks: 100 
        });

        makeShot(0.25, {
            spread: 27,
            startVelocity: 55, 
            gravity: 0.8,  
            ticks: 200 
        });

        makeShot(0.2, {
            spread: 60, 
            gravity: 0.8,  
            ticks: 200 
        });

        makeShot(0.2, {
            spread: 80,
            startVelocity: 60, 
            scalar: 1.1,
            gravity: 0.8,  
            ticks: 200 
        });

        makeShot(0.15, {
            spread: 140,
            startVelocity: 40,
            decay: 0.88,
            gravity: 0.8,  
            ticks: 200 
        });

        makeShot(0.1, {
            spread: 121,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2, 
            gravity: 0.8,  
            ticks: 200 
        });

        makeShot(0.1, {
            spread: 121,
            startVelocity: 45, 
            gravity: 0.8,  
            ticks: 200 
        });
        
        const burstConfigs = [
            { particleRatio: 0.25, options: { spread: 26, startVelocity: 55 } },
            { particleRatio: 0.2, options: { spread: 60 } },
            { particleRatio: 0.35, options: { spread: 100, decay: 0.91, scalar: 0.8 } },
            { particleRatio: 0.1, options: { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 } },
            { particleRatio: 0.2, options: { spread: 80, startVelocity: 60, scalar: 1.1 } },
            { particleRatio: 0.15, options: { spread: 140, startVelocity: 40, decay: 0.88 } },
        ];

        // burstConfigs.forEach(({ particleRatio, options }, index) => {
        //     // 시간차 발사 (좀 더 자연스럽게)
        //     setTimeout(() => {
        //         makeShot(particleRatio, options);
        //     }, index * 100); // 100ms 간격
        // });
    }, [makeShot]);

    return (
        <ReactCanvasConfetti
            refConfetti={getInstance}
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                height: '100%',
                width: '100%',
                top: '5%',
                left: 0
            }}
        />
    );
}
