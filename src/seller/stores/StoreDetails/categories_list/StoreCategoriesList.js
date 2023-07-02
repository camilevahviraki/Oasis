import React from 'react';

const StoreCategoriesList = (props) => {
  const {
    setCategory, getItems, categories, categoryName, searchBar,
  } = props;

  return (
    <>

      <button
        key={categoryName}
        className={
                    categoryName === 'all'
                      ? 'store-category-name current-category'
                      : 'store-category-name'
                }
        onClick={() => setCategory('all')}
        style={searchBar ? { fontSize: '12px', padding: '8px' } : null}
      >
        home
      </button>
      {
                categories ? (
                  <>
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        style={searchBar ? { fontSize: '13px' } : null}
                        className={
                                    category.name === categoryName
                                      ? 'store-category-name current-category'
                                      : 'store-category-name'
                                }
                        onClick={() => {
                          setCategory(category.name);
                        }}
                      >
                        {category.name}
                      </button>
                    ))}
                  </>
                ) : (<div>No categories yet</div>)
            }

    </>
  );
};

export default StoreCategoriesList;
