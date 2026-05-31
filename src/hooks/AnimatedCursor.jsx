import React, { useEffect, useRef, useState, useCallback } from "react";

const IsDevice = (() => {
  if (typeof navigator == 'undefined') return;
  let ua = navigator.userAgent;
  return {
    info: ua,
    Android() { return ua.match(/Android/i); },
    BlackBerry() { return ua.match(/BlackBerry/i); },
    IEMobile() { return ua.match(/IEMobile/i); },
    iOS() { return ua.match(/iPhone|iPad|iPod/i); },
    iPad() { return ua.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2; },
    OperaMini() { return ua.match(/Opera Mini/i); },
    any() {
      return (
        IsDevice.Android() ||
        IsDevice.BlackBerry() ||
        IsDevice.iOS() ||
        IsDevice.iPad() ||
        IsDevice.OperaMini() ||
        IsDevice.IEMobile()
      );
    }
  };
})();

// ✅ Moved to module scope — accessible everywhere in this file
class SmokeParticle {
  constructor(x, y, themeColor) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 5;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.life = 1;
    this.decay = 0.02 + Math.random() * 0.03;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2 - 1;
    this.gravity = -0.1;
    this.themeColor = themeColor;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life -= this.decay;
    this.alpha = this.life * 0.4;
    return this.life > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha * this.life;
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, `rgba(${this.themeColor}, 0.3)`);
    gradient.addColorStop(0.5, `rgba(${this.themeColor}, 0.15)`);
    gradient.addColorStop(1, `rgba(${this.themeColor}, 0)`);
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function useEventListener(eventName, handler, element = document) {
  const savedHandler = useRef();
  useEffect(() => { savedHandler.current = handler; }, [handler]);
  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => { element.removeEventListener(eventName, eventListener); };
  }, [eventName, element]);
}

function CursorCore({
  outerStyle,
  innerStyle,
  color = '220, 90, 90',
  outerAlpha = 0.3,
  innerSize = 8,
  outerSize = 8,
  outerScale = 6,
  innerScale = 0.6,
  trailingSpeed = 8,
  clickables = [
    'a',
    'input[type="text"]',
    'input[type="email"]',
    'input[type="number"]',
    'input[type="submit"]',
    'input[type="image"]',
    'label[for]',
    'select',
    'textarea',
    'button',
    '.link'
  ]
}) {
  const cursorOuterRef = useRef();
  const cursorInnerRef = useRef();
  const smokeCanvasRef = useRef();
  const requestRef = useRef();
  const smokeRequestRef = useRef();
  const previousTimeRef = useRef();
  let endX = useRef(0);
  let endY = useRef(0);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const coordsRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);

  // Get theme colors dynamically
  const [themeColor, setThemeColor] = useState('220, 90, 90');

  useEffect(() => {
    const updateThemeColor = () => {
      const root = document.documentElement;
      const textColor = getComputedStyle(root).getPropertyValue('--text-color').trim();

      if (textColor === '#ffffff' || textColor === 'white' || textColor === '#fff') {
        setThemeColor('255, 255, 255');
      } else {
        setThemeColor('0, 0, 0');
      }
    };

    updateThemeColor();

    // ✅ Debounce only the observer callback (not the initial call),
    // so theme-toggle clicks don't trigger a re-render during the INP window
    let timer;
    const debouncedUpdate = () => {
      clearTimeout(timer);
      timer = setTimeout(updateThemeColor, 50);
    };

    const observer = new MutationObserver(debouncedUpdate);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Smoke particle system
  const smokeParticles = useRef([]);
  const mouseTrail = useRef([]);

  useEffect(() => {
    const canvas = smokeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // ✅ SmokeParticle class is now defined at module scope above — no longer defined here

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const animateSmoke = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Update and draw smoke particles
      smokeParticles.current = smokeParticles.current.filter(particle => {
        const alive = particle.update();
        if (alive) particle.draw(ctx);
        return alive;
      });

      smokeRequestRef.current = requestAnimationFrame(animateSmoke);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animateSmoke();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (smokeRequestRef.current) cancelAnimationFrame(smokeRequestRef.current);
    };
  }, [themeColor]);

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    coordsRef.current.x = clientX;
    coordsRef.current.y = clientY;
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
    }
    endX.current = clientX;
    endY.current = clientY;

    // ✅ SmokeParticle is now accessible here since it's at module scope
    const canvas = smokeCanvasRef.current;
    if (canvas) {
      for (let i = 0; i < 3; i++) {
        const particle = new SmokeParticle(clientX, clientY, themeColor);
        smokeParticles.current.push(particle);
      }
    }
  }, [themeColor]);

  const animateOuterCursor = useCallback((time) => {
    if (previousTimeRef.current !== undefined && cursorOuterRef.current) {
      coordsRef.current.x += (endX.current - coordsRef.current.x) / trailingSpeed;
      coordsRef.current.y += (endY.current - coordsRef.current.y) / trailingSpeed;
      cursorOuterRef.current.style.top = `${coordsRef.current.y}px`;
      cursorOuterRef.current.style.left = `${coordsRef.current.x}px`;
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateOuterCursor);
  }, [trailingSpeed]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animateOuterCursor]);

  const onMouseDown = useCallback(() => setIsActive(true), []);
  const onMouseUp = useCallback(() => setIsActive(false), []);
  const onMouseEnterViewport = useCallback(() => setIsVisible(true), []);
  const onMouseLeaveViewport = useCallback(() => setIsVisible(false), []);

  useEventListener('mousemove', onMouseMove);
  useEventListener('mousedown', onMouseDown);
  useEventListener('mouseup', onMouseUp);
  useEventListener('mouseover', onMouseEnterViewport);
  useEventListener('mouseout', onMouseLeaveViewport);

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return;
    if (isActive) {
      cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale})`;
      cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale})`;
    } else {
      cursorInnerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOuterRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }, [innerScale, outerScale, isActive]);

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return;
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale * 1.2})`;
      cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale * 1.4})`;
    }
  }, [innerScale, outerScale, isActiveClickable]);

  useEffect(() => {
    if (!cursorInnerRef.current || !cursorOuterRef.current) return;
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1;
      cursorOuterRef.current.style.opacity = 1;
    } else {
      cursorInnerRef.current.style.opacity = 0;
      cursorOuterRef.current.style.opacity = 0;
    }
  }, [isVisible]);

  useEffect(() => {
    const clickableEls = document.querySelectorAll(clickables.join(','));
    clickableEls.forEach((el) => {
      el.style.cursor = 'none';
      el.addEventListener('mouseover', () => setIsActive(true));
      el.addEventListener('click', () => { setIsActive(true); setIsActiveClickable(false); });
      el.addEventListener('mousedown', () => setIsActiveClickable(true));
      el.addEventListener('mouseup', () => setIsActive(true));
      el.addEventListener('mouseout', () => { setIsActive(false); setIsActiveClickable(false); });
    });
    return () => {
      clickableEls.forEach((el) => {
        el.removeEventListener('mouseover', () => setIsActive(true));
        el.removeEventListener('click', () => { setIsActive(true); setIsActiveClickable(false); });
        el.removeEventListener('mousedown', () => setIsActiveClickable(true));
        el.removeEventListener('mouseup', () => setIsActive(true));
        el.removeEventListener('mouseout', () => { setIsActive(false); setIsActiveClickable(false); });
      });
    };
  }, [isActive, clickables]);

  const styles = {
    cursorInner: {
      zIndex: 999999,
      display: 'block',
      position: 'fixed',
      borderRadius: '50%',
      width: innerSize,
      height: innerSize,
      pointerEvents: 'none',
      backgroundColor: `rgba(${themeColor}, 1)`,
      ...(innerStyle && innerStyle),
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out'
    },
    cursorOuter: {
      zIndex: 999999,
      display: 'block',
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${themeColor}, ${outerAlpha})`,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
      willChange: 'transform',
      ...(outerStyle && outerStyle)
    },
    smokeCanvas: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 999998,
      display: 'block'
    }
  };

  document.body.style.cursor = 'none';

  return (
    <React.Fragment>
      <canvas ref={smokeCanvasRef} style={styles.smokeCanvas} />
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </React.Fragment>
  );
}

function AnimatedCursor({
  outerStyle,
  innerStyle,
  color,
  outerAlpha,
  innerSize,
  innerScale,
  outerSize,
  outerScale,
  trailingSpeed,
  clickables
}) {
  if (typeof navigator !== 'undefined' && IsDevice.any()) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <CursorCore
      outerStyle={outerStyle}
      innerStyle={innerStyle}
      color={color}
      outerAlpha={outerAlpha}
      innerSize={innerSize}
      innerScale={innerScale}
      outerSize={outerSize}
      outerScale={outerScale}
      trailingSpeed={trailingSpeed}
      clickables={clickables}
    />
  );
}

export default AnimatedCursor;