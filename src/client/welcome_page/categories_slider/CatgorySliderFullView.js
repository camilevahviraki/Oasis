import React, { useState, useRef, useEffect } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { getIconComponent } from '../../../utils/iconMapper';
import './CatgorySliderFullView.css';

const CatgorySliderFullView = (props) => {
  const { data } = props;
  const containerRef = useRef(null);
  const [scrollTo, setScrollTo] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const itemsPerPage = window.innerWidth > 1200 ? 8 : window.innerWidth > 768 ? 6 : 4;

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [data]);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 200;
      const newScroll = containerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      containerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      });

      setTimeout(checkScroll, 300);
    }
  };

  const handleScroll = () => {
    checkScroll();
  };

  // Filter out 'Others' category
  const filteredData = data.filter(
    (card) => card.name !== 'Others' && card.key !== 'others'
  );

  return (
    <div className="category-slider-full-view-container">
      <h3 className="categories-title">Browse All Categories</h3>
      
      <div className="category-carousel-wrapper">
        {canScrollLeft && (
          <button
            className="carousel-nav-button carousel-nav-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <FaAngleLeft />
          </button>
        )}

        <div
          className="category-items-container"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {filteredData.length === 0 ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
                <div
                  className="category-item loading-skeleton"
                  key={card}
                >
                  <div className="animated-gradient" />
                </div>
              ))}
            </>
          ) : (
            <>
              {filteredData.map((card) => {
                const { id, name, icon_name, icon_color } = card;
                const IconComponent = getIconComponent(icon_name);

                return (
                  <div
                    className="category-item"
                    key={id}
                    title={name}
                  >
                    {IconComponent && (
                      <div
                        className="category-item-icon"
                        style={{ color: icon_color || '#FF6B35' }}
                      >
                        <IconComponent size={40} />
                      </div>
                    )}
                    <div className="category-item-name">{name}</div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {canScrollRight && (
          <button
            className="carousel-nav-button carousel-nav-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <FaAngleRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default CatgorySliderFullView;
