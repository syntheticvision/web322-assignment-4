const setData = require('../data/setData');
const themeData = require('../data/themeData');

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            console.log('setData:', setData); // Debugging statement
            console.log('themeData:', themeData); // Debugging statement
            
            setData.forEach(set => {
                const theme = themeData.find(theme => theme.id === set.theme_id);
                const setWithTheme = {
                    ...set,
                    theme: theme ? theme.name : "Unknown"
                };
                sets.push(setWithTheme);
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets);
        } catch (error) {
            reject(error);
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try {
            const set = sets.find(set => set.set_num === setNum);
            if (set) {
                resolve(set);
            } else {
                reject(`Unable to find set with set_num: ${setNum}`);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            const filteredSets = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
            if (filteredSets.length > 0) {
                resolve(filteredSets);
            } else {
                reject(`Unable to find sets with theme containing: ${theme}`);
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
