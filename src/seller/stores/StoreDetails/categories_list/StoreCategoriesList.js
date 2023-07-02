import React from 'react'

const StoreCategoriesList = (props) => {

    const { setCategory, getItems, categories, categoryName, searchBar } = props;

    return (
        <>

            <button
                className={
                    categoryName === 'all'
                        ? 'store-category-name current-category'
                        : 'store-category-name'
                }
                onClick={() => setCategory('all')}
                style={searchBar?{fontSize: '12px', padding: '8px'}:null}
            >
                home
            </button>
            {
                categories ? (
                    <>
                        {categories.map((category) => (
                            <button
                                style={searchBar?{fontSize: '13px'}:null}
                                className={
                                    category.name === categoryName
                                        ? 'store-category-name current-category'
                                        : 'store-category-name'
                                }
                                onClick={() => {
                                    setCategory(category.name);
                                    dispatch(
                                        getItems({
                                            category: category.name,
                                            store_id: storeId.store_id,
                                        }),
                                    );
                                }}
                            >
                                {category.name}
                            </button>
                        ))}
                    </>
                ) : (<div>No categories yet</div>)
            }

        </>
    )
}

export default StoreCategoriesList