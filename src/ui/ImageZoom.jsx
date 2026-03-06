import { useRef, useState, useCallback, useMemo } from "react";

import styled, { css } from "styled-components";

const ImageZoomContainer = styled.figure`
  overflow: hidden;
  position: relative;
  cursor: zoom-in;
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
  ${(props) =>
    props.width &&
    css`
      width: ${(props) => `${props.width}rem`};
    `}
  ${(props) =>
    props.height &&
    css`
      height: ${(props) => `${props.height}rem`};
    `}
`;

const StyledImageZoom = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.1s ease-out;
  will-change: transform;
  display: block;
`;

const ImageZoom = ({ src, width, height, alt = "", scaleInit = 1.5 }) => {
  const containerRef = useRef(null);
  const temporizerRef = useRef(null);
  const lastPositionRef = useRef(null);
  const [zoomScale, setZoomScale] = useState(scaleInit);
  const [isZoomed, setIsZoomed] = useState(false);
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);

  const updateMousePosition = useCallback((x, y) => {
    lastPositionRef.current = { x, y };
    if (temporizerRef.current === null) {
      temporizerRef.current = window.setTimeout(() => {
        if (lastPositionRef.current) {
          setPositionX(lastPositionRef.current.x);
          setPositionY(lastPositionRef.current.y);
        }
        temporizerRef.current = null;
        lastPositionRef.current = null;
      }, 16);
    }
  }, []);

  const calculatePosition = useCallback(
    (clientX, clientY) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(100, ((clientX - rect.left) / rect.width) * 100),
      );
      const y = Math.max(
        0,
        Math.min(100, ((clientY - rect.top) / rect.height) * 100),
      );
      updateMousePosition(x, y);
    },
    [updateMousePosition],
  );

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
    setZoomScale(scaleInit);
    if (temporizerRef.current !== null) {
      clearTimeout(temporizerRef.current);
      temporizerRef.current = null;
    }
    if (lastPositionRef.current) {
      setPositionX(lastPositionRef.current.x);
      setPositionY(lastPositionRef.current.y);
      lastPositionRef.current = null;
    }
  }, [scaleInit]);

  const handleMouseMove = useCallback(
    (e) => {
      calculatePosition(e.clientX, e.clientY);
    },
    [calculatePosition],
  );

  const handleIncreaseScale = () => {
    if (zoomScale >= scaleInit && zoomScale <= scaleInit + 10) {
      setZoomScale((z) => z + 0.1);
    } else {
      setZoomScale(scaleInit);
    }
  };

  const imageStyle = useMemo(
    () => ({
      transformOrigin: `${positionX}% ${positionY}%`,
      transform: isZoomed ? `scale(${zoomScale})` : "scale(1)",
    }),
    [positionX, positionY, isZoomed, zoomScale],
  );

  return (
    <ImageZoomContainer
      ref={containerRef}
      height={height}
      width={width}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleIncreaseScale}
    >
      <StyledImageZoom src={src} alt={alt} style={imageStyle} />
    </ImageZoomContainer>
  );
};

export default ImageZoom;
