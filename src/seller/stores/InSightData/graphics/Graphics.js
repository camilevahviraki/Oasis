import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar,
} from 'recharts';
import { getStoreGraphs } from '../../../../redux/store_sales/getStoreGraphs';

const Graphics = (props) => {
  const { storeData, itemId } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    if (storeData.id) {
      dispatch(getStoreGraphs(storeData.id));
    }
  }, []);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(400);

  const graphics = useSelector((state) => state.storeGraphsReducer);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const { width } = container.getBoundingClientRect();
      setContainerWidth(width);
    }
  }, []);

  // single_item = params[:singleItem]
  // amount_per_date = params[:amountPerDate]
  // item_id = params[:item_id]
  // store_id = params[:store_id]

  return (
    <div className="store-charts-container" ref={containerRef}>
      <h2>Store Analytics</h2>
      <LineChart width={containerWidth} height={300} data={graphics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          angle={-45}
          textAnchor="end"
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Graphics;
