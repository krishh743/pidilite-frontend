
export const Config = {
    // BASE_API_URL: (import.meta.env.REACT_APP_BASE_API_URL || "http://localhost:8000") + '/api'

    // BASE_API_URL: (myConfig.BASE_API_URL || "https://analytics.zebralearn.com") + '/api'
    BASE_API_URL: (process.env.REACT_APP_BASE_URL || "http://localhost:3001") 

};
