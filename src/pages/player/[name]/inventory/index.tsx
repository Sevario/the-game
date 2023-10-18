import React from 'react';
import { fetchPlayerSingle } from '@utils/data-fetching.js'; 
import InventoryC from '@components/inventory/Inventory';

const Inventory = ({ player }: any) => {
  if (!player) {
    console.log('no userino');
  }
  return (
    // <div>Inventory</div>
    // <InventoryC />
    <div>test</div>
  );
}

export async function getServerSideProps(context: any) {
  const player = await fetchPlayerSingle(context.params.name);
   
  return {
    props: {
      player,
    }
  };
}

export default Inventory;