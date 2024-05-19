import { useState } from "react";

export const setWithExpiry = (key, value, ttl) => {
	if (!ttl) {
		ttl = 3600000;
	}
	const now = new Date();

	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
	if (!localStorage) {
		return null;
	}

	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date().getTime();
	if (now > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

const useLocalStorage = (initialData, key, ttl = 3600000) => {
	const [data, setData] = useState(() => {
		const storedData = getWithExpiry(key);
		return storedData !== null ? storedData : initialData;
	});

	const setDataWithExpiry = (value) => {
		setWithExpiry(key, value, ttl);
		setData(value);
	};

	const clearData = () => {
		localStorage.removeItem(key);
		setData(initialData);
	};

	return [data, setDataWithExpiry, clearData];
};

export default useLocalStorage;
