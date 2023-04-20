import React from 'react';
import './InsightData.css';

const InSightData = () => {
  const data = [
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
  ]
  return (
    <div className="insight-main-wrapp">
      <div className="insight-table-wrapp">
         {
          data.map((el) => (
            <div className="insight-table-row">
              {
                el.map((child) => (
                  <div className='insight-table-cell'>{child}</div>
                ))
              }
            </div>
          ))
         }
      </div>
    </div>
  )
}

export default InSightData