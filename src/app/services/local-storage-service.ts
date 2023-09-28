class LocalStorageService {
    public setItem = (name: string, value: any) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(name, JSON.stringify(value));
        }
    };
    public getItem = (name: string): any => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const value = localStorage.getItem(name);
            console.log(value)
            if (value !== null) {
                return JSON.parse(value);
            }
        }
        return null;
    };
}

export const localStorageService = new LocalStorageService();