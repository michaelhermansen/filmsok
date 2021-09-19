import React, { createContext } from 'react';

interface LoadingContextProps {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<Partial<LoadingContextProps>>({});
