import {useState} from 'react';
import {filterItemSyncValue} from '../settings/utils';

export const useSearch = ({items: ir}) => {
  const [items, setLocalItems] = useState(ir);

  const setSearch = text => {
    setTimeout(() => {
      let result;
      if (text.length >= 1) result = filterItemSyncValue(text, ir);
      else result = ir;
      setLocalItems(result);
    }, 100);
  };

  return [setSearch, items];
};
