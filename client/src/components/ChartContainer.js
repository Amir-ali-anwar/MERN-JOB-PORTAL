import React, { useState } from 'react'
import {useSelector } from "react-redux";
import Wrapper from '../assets/wrappers/ChartsContainer'
import BarChart from './BarChat'
import AreaChart from './AreaChart'
import Button from './Button'
const ChartContainer = () => {
  const [toggleBar,SettoggleBar]=useState(true);
  const { monthlyApplications } = useSelector((store) => store.Stats);
  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <Button type="buton" onClick={() => SettoggleBar(!toggleBar)}>
        {toggleBar ? "Area Chat" : "Bar Chat"}
      </Button>
      {toggleBar ? (
        <BarChart data={monthlyApplications} />
      ) : (
        <AreaChart data={monthlyApplications} />
      )}
    </Wrapper>
  );
}

export default ChartContainer