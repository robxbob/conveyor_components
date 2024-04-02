import { useStore } from '@tanstack/react-store';

import { useConveyorStore } from './useConveyorStore';

export const useFetcher = () => {
  const conveyorStore = useConveyorStore();
  return useStore(conveyorStore, (state) => state.fetcher);
};
